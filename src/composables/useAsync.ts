import type { Ref } from 'vue'
import { ref } from 'vue'

export interface UseAsyncReturn<Callback> {
  isLoading: Ref<boolean>
  execute: Callback
}

interface UseAsyncOptions {

  immediate?: boolean

  onError?: (e: unknown) => void

  loadingService?: () => () => void

  isLoading?: Ref<boolean>

}

export function useAsync<Data, Callback =((...args: any[]) => Promise<Data>)>(
  callback: Callback,
  options: UseAsyncOptions = {},
): UseAsyncReturn<Callback> {
  const isLoading = ref(false)

  let loadingServiceClose: () => void
  watch(isLoading, (isLoading) => {
    if (options.isLoading) {
      options.isLoading.value = isLoading
    }

    if (options.loadingService) {
      if (isLoading) {
        loadingServiceClose = options.loadingService()
      } else if (loadingServiceClose) {
        loadingServiceClose()
      }
    }
  })

  async function execute(...args: any[]) {
    try {
      isLoading.value = true
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result = await callback(...args)
      isLoading.value = false
      return result
    } catch (error) {
      isLoading.value = false
      if (options.onError) {
        options.onError(error)
      }
      throw error
    }
  }

  if (options.immediate) {
    execute()
  }

  return {
    isLoading,
    execute: execute as unknown as Callback,
  }
}
