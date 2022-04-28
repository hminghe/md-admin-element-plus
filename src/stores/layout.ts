import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { breakpoints } from '@/composables'

export const useLayoutStore = defineStore('layout', () => {
  const route = useRoute()
  const menu = reactive({
    isCollapse: false,
    isDrawer: false,
  })
  watch(() => route.fullPath, () => {
    if (menu.isDrawer) {
      menu.isCollapse = true
    }
  })
  watch(breakpoints.lg, (lg) => {
    menu.isCollapse = !lg
  }, { immediate: true })
  watch(breakpoints.sm, (sm) => {
    menu.isDrawer = !sm
  }, { immediate: true })

  return {
    menu,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
