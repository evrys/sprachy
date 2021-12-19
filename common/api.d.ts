import type { ZodIssue } from 'zod'

export type LoginResult =
  { status: 200, summary: ProgressSummary } |
  { status: 422, code: 'validation failed', errors: ZodIssue[] } |
  { status: 401, code: 'new user' } |
  { status: 401, code: 'wrong password' }

export type SignupResult =
  { status: 200, summary: ProgressSummary } |
  { status: 422, code: 'validation failed', errors: ZodIssue[] } |
  { status: 409, code: 'user already exists' }


export type User = {
  id: string
  email: string
  isAdmin: boolean
}

export type ProgressItem = {
  id: string
  userId: string
  patternId: string
  initiallyLearnedAt: number
  lastLeveledAt: number
  lastReviewedAt: number
  srsLevel: number
}

/**
 * Package of initial information sent to the frontend
 * on login/signup
 */
export type ProgressSummary = {
  user: User
  progressItems: ProgressItem[]
}