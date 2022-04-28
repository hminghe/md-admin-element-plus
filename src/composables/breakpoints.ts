import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// sm: 640px;
// md: 768px;
// lg: 1024px;
// xl: 1280px;
// '2xl': 1536px;
export const breakpoints = useBreakpoints(breakpointsTailwind)
