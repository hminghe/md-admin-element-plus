import { onBeforeUnmount } from 'vue'
import type { Window } from './useMultiWindowStore'
import { useMultiWindowStore } from './useMultiWindowStore'

export * from './setupMultiWindow'
export * from './useMultiWindowStore'
export * from './wrapperComponent'

export function getCurrentWindow(): Window {
  const store = useMultiWindowStore()
  return store.currentWindow!
}

export function onRefresh(callback: (next: () => void) => void) {
  const window = getCurrentWindow()
  if (!window) {
    return () => null
  }

  const { refreshCallback } = window

  refreshCallback.push(callback)

  function removeEvent() {
    const index = refreshCallback.indexOf(callback)
    if (index > -1) {
      refreshCallback.splice(index, 1)
    }
  }

  onBeforeUnmount(() => removeEvent())

  return removeEvent
}
