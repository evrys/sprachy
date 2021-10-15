
import { testenv } from './testenv'

test('srs progress updates', async () => {
  const { asUser } = await testenv()

  // User gets their first lesson
  const pattern = await asUser.api.getNextPattern()
  expect(pattern.slug).toEqual("die-der-das")

  // User learns about the pattern
  const progress1 = await asUser.api.recordReview(pattern.id, true)
  expect(progress1.srsLevel === 1)

  // Doesn't get the same pattern next time
  const pattern2 = await asUser.api.getNextPattern()
  expect(pattern2.slug).not.toEqual("die-der-das")

  // It's not time to review yet; recording review does nothing
  const progress2 = await asUser.api.recordReview(pattern.id, true)
  expect(progress2.srsLevel === 1)


  // // User can insert a new progress item for their own id
  // var progress = await asUser.api.setProgress({
  //   pattern_id: pattern.id,
  //   srs_level: 3
  // })
  // expect(progress.srs_level).toBe(3)

  // // User can update that progress item using the same method
  // var progress = await asUser.api.setProgress({
  //   pattern_id: pattern.id,
  //   srs_level: 4
  // })
  // expect(progress.srs_level).toBe(4)

  // // User can retrieve their own progress (only)
  // var allProgress = await asUser.api.getAllProgress()
  // expect(allProgress.length).toBe(1)
  // expect(allProgress[0].srs_level).toBe(4)

  // var { data, error } = await asUser.db.from("progress").insert([{
  //   user_id: asUser.session.user!.id,
  //   pattern_id: pattern.id,
  //   srs_level: 0
  // }])
  // expect(error).toBe(null)

  // // User can't insert a new progress item for someone else's id
  // var { data, error } = await asUser.db.from("progress").insert([{
  //   user_id: asAdmin.user.id,
  //   pattern_id: pattern.id,
  //   srs_level: 0
  // }])
  // expect(error?.message).toContain("violates row-level security policy")
})