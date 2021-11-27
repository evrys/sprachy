
import { testenv } from './testenv'
import { sprachdex } from '../common/sprachdex'
import time from '../common/time'
import { db } from '../server/db'

test('srs progress updates', async () => {
  const { asUser } = await testenv()

  // Initial state, no progress recorded
  const summary = await asUser.api.getProgress()
  expect(summary.user).toBeDefined()
  expect(summary.progressItems).toEqual([])

  // User learns about a pattern
  const pattern = sprachdex.allPatterns[0]
  const progress1 = await asUser.api.recordReview(pattern.id, true)
  expect(progress1.srsLevel === 1)

  // Gotta wait before we can level again
  const progress2 = await asUser.api.recordReview(pattern.id, true)
  expect(progress2.srsLevel === 1)

  // Wait for 4 hours
  await db.progress.update(progress2.id, {
    lastLeveledAt: progress2.lastLeveledAt - time.hours(4)
  })

  // Now we can level up
  const progress3 = await asUser.api.recordReview(pattern.id, true)
  expect(progress3.srsLevel === 2)

  // Level doesn't decrease on failure
  const progress4 = await asUser.api.recordReview(pattern.id, false)
  expect(progress4.srsLevel === 2)
})