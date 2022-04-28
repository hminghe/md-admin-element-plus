import { useTitle } from '@vueuse/core'
import { type Component, computed, defineComponent, h, markRaw, reactive } from 'vue'

import { type RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { baseComponentKey } from '.'

const appName = (import.meta.env.VITE_APP_NAME || 'Admin') as string

export interface Window {
  key: string
  fullPath: string
  name: string | null
  refreshKey: number
  refreshCallback: ((next: () => void) => void)[]
  componentName: string
  component?: Component
  baseComponent?: Component
  close: () => void
  refresh: () => void
  rename: (name: string) => void
}

export default function useStore() {
  const router = useRouter()
  const route = useRoute()

  const windows = reactive<Window[]>([])
  // const currentWindow = ref<Window | null>(null)
  const currentWindow = computed(() => {
    return findWindowByFullPath(route.fullPath)
  })
  const lastWindow = ref<Window>()
  watch(currentWindow, (_, old) => {
    lastWindow.value = old
  })

  const title = computed(() => {
    return currentWindow.value ? `${currentWindow.value.name} - ${appName}` : appName
  })
  useTitle(title)

  function findWindow(windowOrKey: Window | string) {
    const key = typeof windowOrKey === 'string' ? windowOrKey : windowOrKey.key
    return windows.find(item => item.key === key)
  }

  function findWindowByFullPath(fullPath: string) {
    return windows.find(item => item.fullPath === fullPath)
  }

  function findWindowIndex(windowOrKey: Window | string) {
    const key = typeof windowOrKey === 'string' ? windowOrKey : windowOrKey.key
    return windows.findIndex(item => item.key === key)
  }

  function hasCurrentWindow(windowOrKey: Window | string) {
    const current = currentWindow.value
    if (!current) {
      return false
    }

    const key = typeof windowOrKey === 'string' ? windowOrKey : windowOrKey.key

    return key === current.key
  }

  function switchWindow(windowOrKey: Window | string) {
    const window = findWindow(windowOrKey)!

    if (route.fullPath !== window.fullPath) {
      router.push(window!.fullPath)
    }

    return findWindowByFullPath(window.fullPath)
  }

  function createWindowComponent(window: Window) {
    window.component = markRaw(defineComponent({
      name: `${window.fullPath}-${window.refreshKey}`,
      setup() {
        return () => h(window.baseComponent!)
      },
    }))
  }

  function createWindow(to: RouteLocationNormalizedLoaded) {
    const {
      fullPath,
      meta,
    } = to

    const key = `${fullPath}-${Date.now().toString()}`
    const window = reactive({
      key,
      fullPath,
      name: typeof meta.name === 'string' ? meta.name : '未设置名称',
      refreshKey: 1,
      refreshCallback: [],
      componentName: route.name as string,
      baseComponent: markRaw(meta[baseComponentKey] as Component),
      close() {
        closeWindow(key)
      },
      refresh() {
        refreshWindow(key)
      },
      rename(name: string) {
        windowRename(key, name)
      },
    })

    if (lastWindow.value) {
      windows.splice(findWindowIndex(lastWindow.value) + 1, 0, window)
    } else {
      windows.push(window)
    }

    // const window = windows[windows.length - 1]
    createWindowComponent(window)

    return window
  }

  function openWindow(to: RouteLocationNormalizedLoaded) {
    const window = findWindowByFullPath(to.fullPath) || createWindow(to)

    return switchWindow(window)!
  }

  function closeWindow(windowOrKey: Window | string) {
    // if (windows.length === 1) {
    //   return
    // }
    //

    if (hasCurrentWindow(windowOrKey)) {
      router.back()
    }

    const index = findWindowIndex(windowOrKey)

    if (index > -1) {
      windows.splice(index, 1)
    }
  }

  function closeWindowForOther(window = currentWindow.value, command = 'other') {
    if (!window) {
      return
    }
    if (!hasCurrentWindow(window)) {
      switchWindow(window)
    }

    const index = findWindowIndex(window)

    switch (command) {
      case 'other':
        windows.splice(0, windows.length, window)
        break
      case 'left':
        windows.splice(0, index)
        break
      case 'right':
        windows.splice(index + 1, windows.length - index - 1)
        break
    }
  }

  function refreshWindow(windowOrKey: Window | string) {
    const window = findWindow(typeof windowOrKey === 'string' ? windowOrKey : windowOrKey.key)
    if (window) {
      const runStep = (i = 0) => {
        if (window.refreshCallback && window.refreshCallback[i]) {
          window.refreshCallback[i](() => runStep(i + 1))
        } else {
          window.refreshKey++
          createWindowComponent(window)
        }
      }
      runStep()
    }
  }

  function windowRename(windowOrKey: Window | string, name: string) {
    const window = findWindow(windowOrKey)
    if (window) {
      window.name = name
    }
  }

  return {
    currentWindow,
    windows,
    hasCurrentWindow,
    findWindow,
    findWindowByFullPath,
    findWindowIndex,
    switchWindow,
    createWindow,
    openWindow,
    closeWindow,
    closeWindowForOther,
    refreshWindow,
    windowRename,
    lastWindow,
  }
}

export type UseStore = typeof useStore
