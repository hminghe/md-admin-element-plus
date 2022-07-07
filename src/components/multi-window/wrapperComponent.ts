import type { VNode } from 'vue'
import { useRoute } from 'vue-router'
import { useMultiWindowStore } from '.'

export function wrapperComponent(comp: VNode) {
  const store = useMultiWindowStore()
  const route = useRoute()

  if (route.meta.multiWindow) {
    const window = store.openWindow(route)
    return window.component
  } else {
    return comp
  }
}
