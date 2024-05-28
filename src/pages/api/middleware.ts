import { useEffect, useRef } from 'react'
import { Middleware, SWRHook, unstable_serialize } from 'swr'

export type CancellablePromise<T> = Promise<T> & {
  cancel: (str?: string) => void
}

export const cancelMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
  const cancelRef = useRef<() => void>()
  const keyString = unstable_serialize(key)
  const extendsFetcher = fetcher
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (...rest: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const request = fetcher(...rest) as CancellablePromise<any>
        cancelRef.current = request.cancel
        return request
      }
    : fetcher
  const swr = useSWRNext(key, extendsFetcher, config)

  useEffect(() => {
    return () => {
      cancelRef.current?.()
    }
  }, [keyString])
  return swr
}
