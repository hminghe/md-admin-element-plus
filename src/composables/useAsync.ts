import { type AsyncStateOptions, type UseAsyncStateReturn } from '@vueuse/core'

export function useAsync<Shallow extends boolean = true>(
  promise: Promise<any> | ((...args: any[]) => Promise<any>),
  options?: AsyncStateOptions<Shallow>,
): UseAsyncStateReturn<void, Shallow> {
  return useAsyncState(promise, undefined, {
    immediate: false,
    ...options,
  })
}
