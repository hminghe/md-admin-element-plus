import { computed } from 'vue'
import { breakpoints } from '@/composables'

export const descriptionsColumn = computed(() => {
  if (breakpoints.lg.value) {
    return 3
  }
  if (breakpoints.md.value) {
    return 2
  }
  return 1
})
