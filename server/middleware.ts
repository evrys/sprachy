import { Router } from 'worktop'
import type { ServerRequest } from 'worktop/request'
import type { ServerResponse } from 'worktop/response'
import type { User } from '../common/api'
import { Session, sessions } from './sessions'
import { db } from './db'
import * as cookie from "cookie"
import { ZodError } from 'zod'
import { FaunaHTTPError } from './faunaUtil'

/**
 * Throw this to signal that request processing should
 * abort immediately and send an error response with the given 
 * http status code + message 
 */
export class HTTPError extends Error {
  constructor(readonly status: number, message: string) {
    super(message)
  }
}

type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'


/**
 * Request from a user that may or may not be logged in.
 * If they are, the session property will be available.
 */
export type APIRequest = ServerRequest & {
  session: Session | null
}

/**
 * Router that checks for session cookie and sends json obj returns from handler
 */
export class APIMiddleware {
  worktopRouter: Router = new Router()

  add(method: HTTPMethod, path: string, handler: (req: APIRequest, res: ServerResponse) => Promise<any>) {
    this.worktopRouter.add(method, path as string, async (req, res) => {
      const cookies = cookie.parse(req.headers.get('cookie') || '')
      const sessionKey = cookies['sessionKey']
      const session = sessionKey ? await sessions.get(sessionKey) : null

      const baseReq = req as APIRequest
      baseReq.session = session

      try {
        const responseData = await handler(baseReq, res)

        if (responseData !== undefined) {
          res.send(200, responseData)
        }
      } catch (err: any) {
        console.error(err)

        if (err instanceof HTTPError) {
          // We intentionally threw a http error here
          res.send(err.status, err.message)

        } else if (err instanceof ZodError) {
          // An error from Zod means the server is working correctly, but the
          // client sent something we couldn't process
          //
          // The flattened format goes to the frontend as e.g.
          // {"formErrors":[],"fieldErrors":{"email":["Invalid email"]}}
          res.send(422, err.flatten())

        } else if (err instanceof FaunaHTTPError) {
          // Various fauna query errors that we just send straight through
          // to the frontend for handling, primarily 401s and 404s

          res.send(err.status, { code: err.code, message: err.message })
        } else {
          // The server is broken somehow! This should only be sent
          // if there's an actual bug involved.
          res.send(500, err.stack)
        }
      }
    })
  }
}

/**
 * Request from a user that is definitely logged in.
 */
export type SessionRequest = ServerRequest & {
  session: Session
}

/**
 * Router that only allows requests with a valid session
 */
export class RequireLoginMiddleware {
  constructor(readonly parent: APIMiddleware) { }

  add(method: HTTPMethod, path: string, handler: (req: SessionRequest, res: ServerResponse) => Promise<any>) {
    this.parent.add(method, path, async (req, res) => {
      if (!req.session) {
        throw new HTTPError(401, "Login required")
      }

      return handler(req as SessionRequest, res)
    })
  }
}

/**
 * Request from a user verified to be an admin.
 */
export type AdminRequest = SessionRequest & {
  user: User
}

/**
 * Router that only allows requests from authorized admin users
 */
export class AdminMiddleware {
  constructor(readonly parent: RequireLoginMiddleware) { }

  add(method: HTTPMethod, path: string, handler: (req: AdminRequest, res: ServerResponse) => Promise<any>) {
    this.parent.add(method, path, async (req, res) => {
      const user = await db.users.get(req.session.userId)
      if (!user || !user.isAdmin) {
        throw new HTTPError(403, "Forbidden")
      }

      const adminReq = req as AdminRequest
      adminReq.user = user

      return handler(adminReq, res)
    })
  }
}