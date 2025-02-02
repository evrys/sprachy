import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { time } from "$lib/time"
import { jsonResponse } from "$lib/server/util"

export const POST: RequestHandler = async ({ locals }) => {
  if (!locals.session)
    return jsonResponse(401, { error: "Not logged in" })

  const items = await db.progress.listAllFor(locals.session.userId)
  await Promise.all(items.map(item => {
    return db.progress.update(item.id, { lastExperienceGainAt: item.lastExperienceGainAt - time.days(100) })
  }))
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session.userId),
    db.progress.listAllFor(locals.session.userId)
  ])
  return jsonResponse(200, { user, progressItems })
}