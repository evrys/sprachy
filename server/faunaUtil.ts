import faunadb from 'faunadb'
import type { ClientConfig } from 'faunadb'

export function customFetch(url: RequestInfo, params: RequestInit | undefined) {
  const signal = params?.signal
  delete params?.signal

  const abortPromise: Promise<Response> = new Promise((resolve) => {
    if (signal) {
      signal.onabort = resolve as any
    }
  })

  return Promise.race([abortPromise, fetch(url, params)])
}

export function getFaunaError(error: any) {
  const { code, description } = error.requestResult.responseContent.errors[0]
  let status

  switch (code) {
    case 'instance not found':
      status = 404
      break
    case 'instance not unique':
      status = 409
      break
    case 'permission denied':
      status = 403
      break
    case 'unauthorized':
    case 'authentication failed':
      status = 401
      break
    default:
      status = 500
  }

  return { code, description, status }
}

export function flattenFauna<T>(d: FaunaDocument<T>): T {
  return {
    id: d.ref.value.id,
    ts: d.ts,
    ...d.data
  } as any
}

export type FaunaDocument<T> = {
  ref: { value: { id: string } }
  ts: number
  data: Omit<T, 'id' | 'ts'>
}

export function makeFaunaClient(config: Omit<ClientConfig, 'fetch'>) {
  return new faunadb.Client({
    fetch: typeof fetch === 'undefined' ? undefined : customFetch,
    ...config
  })
}