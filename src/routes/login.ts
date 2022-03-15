import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"

import { db } from "../server/db"
import { sessions } from "../server/sessions"
import { FaunaError } from "../server/faunaUtil"
import { ZodError } from "zod"
import { errorsByField } from "../client/utils"

type FaunaLoginToken = {
  ref: { value: { id: string } } // Token ref
  ts: number
  instance: { value: { id: string } } // User ref
  secret: string
}

const loginForm = z.object({
  email: z.string(),
  password: z.string()
})
export const post: RequestHandler<void, { username: string }> = async ({ request }) => {
  // @ts-ignore
  const data = Object.fromEntries(await request.formData())

  try {
    const { email, password } = loginForm.parse(data)

    const result = await db.faunaQuery(
      Login(
        Match(Index("users_by_email"), email),
        { password: password },
      )
    ) as FaunaLoginToken

    // Note that we're not actually using fauna's access control here; we only ask
    // them to check the user's password, and then take it from there
    const user = await db.users.expect(result.instance.value.id)
    const sessionKey = await sessions.create(user.id)
    const progressItems = await db.progress.listAllFor(user.id)
    return {
      status: 200,
      headers: {
        'set-cookie': sessions.asCookie(sessionKey)
      }
    }
    // return { summary: { user, progressItems } }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        status: 422,
        body: {
          errors: errorsByField(err.issues)
        }
      }
    } else if (err instanceof FaunaError && err.code === "authentication failed") {
      return {
        status: 401,
        body: {
          errors: {
            password: "The password doesn't match the user"
          }
        }
      }
    } else {
      throw err
    }
  }
}