import type { ServerResponse } from "worktop/response"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"

import type { User, ProgressSummary } from "../../common/api"
import type { APIRequest } from "../middleware"
import { db } from "../db"
import { sessions } from "../sessions"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
}).refine(d => d.password.length >= 10, {
  message: "Password must be at least length 10",
  path: ["password"]
}).refine(d => d.password === d.confirmPassword, {
  message: "Confirm password must be identical to password",
  path: ["confirmPassword"]
})
export async function signup(req: APIRequest, res: ServerResponse): Promise<ProgressSummary> {
  const { email, password, confirmPassword } = signupForm.parse(await req.body())

  let user: User
  try {
    user = await db.users.create({ email, password, isAdmin: false })
  } catch (err: any) {
    throw err
  }

  const progressItems = await db.progress.listAllFor(user.id)

  const sessionKey = await sessions.create(user.id)
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))
  return { user, progressItems }
}

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
export async function login(req: APIRequest, res: ServerResponse): Promise<ProgressSummary | { newUser: true }> {
  const { email, password } = loginForm.parse(await req.body())

  if (await db.users.getByEmail(email) == null) {
    return ({ newUser: true })
  }


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
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))

  const progressItems = await db.progress.listAllFor(user.id)

  return { user, progressItems }
}

export async function logout(req: APIRequest): Promise<void> {
  if (!req.session) return
  await sessions.expire(req.session.key)
}