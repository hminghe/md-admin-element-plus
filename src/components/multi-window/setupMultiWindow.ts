import { type RouteRecordRaw } from 'vue-router'

export function setupMultiWindow(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  routes.forEach((route) => {
    if (route.children) {
      route.children.forEach((route) => {
        if (!route.meta) {
          route.meta = {}
        }
        const {
          layout = 'default',
          multiWindow = undefined,
        } = route.meta

        route.meta.multiWindow = multiWindow || (multiWindow === undefined && layout === 'default')
      })
    }
  })

  return routes
}
