import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'

import { db } from "$lib/server/db"
import { sessions } from "$lib/server/sessions"
import { FaunaError } from "$lib/server/faunaUtil"
import http from "$lib/server/http"

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
export const post: RequestHandler = async ({ request, locals }) => {
  const { email, password } = signupForm.parse(await request.json())
  try {
    const user = await db.users.create({ email, password, isAdmin: false })
    const progressItems = await db.progress.listAllFor(user.id)
    const sessionKey = await sessions.create(user.id)

    console.log(locals.env.VITEST)
    if (locals.env.DISCORD_SIGNUP_WEBHOOK && !locals.env.VITEST) {
      const params = {
        username: "SignUp",
        avatar_url: "",
        content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
      }

      http.postJson(locals.env.DISCORD_SIGNUP_WEBHOOK, params)
      // const req = http.postJson(locals.env.DISCORD_SIGNUP_WEBHOOK, params)
      // platform.context.waitUntil(req)
    }

    return {
      status: 200,
      headers: {
        'set-cookie': sessions.asCookie(sessionKey)
      },
      body: {
        summary: { user, progressItems }
      }
    }
  } catch (err) {
    if (err instanceof FaunaError && err.code === "instance not unique") {
      console.log(err)
      return {
        status: 409,
        body: {
          message: "Email is already in use",
        }
      }
    } else {
      throw err
    }
  }
}