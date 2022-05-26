import { type RouteRecordRaw, onBeforeRouteUpdate } from 'vue-router'
import { type AsyncComponentLoader, KeepAlive, h, provide } from 'vue'
import MultiWindowRouterTransition from './MultiWindowRouterTransition.vue'
import { type UseStore } from './store'
import { baseComponentKey, injectionKey } from './'

export function createMultiWindowComponentWrap(routeRaw: RouteRecordRaw, useStore: UseStore) {
  if (!routeRaw.component) {
    return
  }
  if (!routeRaw.meta) {
    routeRaw.meta = {}
  }
  routeRaw.meta[baseComponentKey] = defineAsyncComponent(routeRaw.component as AsyncComponentLoader)

  const name = routeRaw.name as string
  // eslint-disable-next-line vue/one-component-per-file
  routeRaw.component = defineComponent({
    name,
    setup() {
      const route = useRoute()
      const store = useStore()
      const { openWindow } = store

      const currentWindow = ref(openWindow(route))

      onActivated(async() => {
        currentWindow.value = openWindow(route)
      })

      onBeforeRouteUpdate((to) => {
        // 进入这个钩子URL实际还没变化，如果直接切换组件会导致组件获取url还是旧的
        watchOnce(() => route.fullPath, (fullPath: string) => {
          if (fullPath === to.fullPath) {
            currentWindow.value = openWindow(to)
          }
        })
      })

      const keepAliveInclude = computed(() => {
        return store.windows.filter(window => window.componentName === name).map(window => `${window.fullPath}-${window.refreshKey}`)
      })

      provide(injectionKey, {
        window: currentWindow,
        store,
      })

      return () => {
        const {
          // fullPath,
          component,
        } = currentWindow.value
        // const Comp = componentMap.get(fullPath)
        if (!component) {
          return null
        }
        return h(
          MultiWindowRouterTransition,
          () => h(
            KeepAlive,
            { include: keepAliveInclude.value },
            h(component),
          ),
        )
      }
    },
  })
}

function createUseStore(useStore: UseStore): UseStore {
  let store: ReturnType<UseStore>
  return () => {
    if (!store) {
      store = useStore()
    }
    return store
  }
}

export function setupMultiWindow(routes: RouteRecordRaw[], useStore: any): RouteRecordRaw[] {
  const useStoreProxy = createUseStore(useStore)

  routes.forEach((route) => {
    if (route.children) {
      route.children.forEach((route) => {
        const {
          layout = 'default',
          multiWindow = true,
        } = route.meta || {}
        if (multiWindow && layout === 'default') {
          createMultiWindowComponentWrap(route, useStoreProxy)
        }
      })
    }
  })

  return routes
}
