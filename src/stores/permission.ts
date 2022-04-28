import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowReactive, toRefs } from 'vue'

export interface PermissionState {
  menuList: Menu[] // 菜单树
  allMenu: Menu[]
  identifyList: string[]
}

export interface Menu {
  name: string
  path: string
  icon?: string
  children?: Menu[]
  parent?: Menu | null
}

export const usePermissionStore = defineStore('permission', () => {
  const state = shallowReactive<PermissionState>({
    menuList: [], // 菜单
    allMenu: [],
    identifyList: [], // 权限标识
  })

  const setMenuList = (menuList: Menu[]) => {
    menuList = JSON.parse(JSON.stringify(menuList))
    const allMenu: Menu[] = []

    const recursive = (list: Menu[], parent: Menu | null = null) => list.forEach((menu) => {
      menu.parent = parent
      allMenu.push(menu)

      if (menu.children) {
        recursive(menu.children, menu)
      }
    })
    recursive(menuList)

    state.allMenu = allMenu
    state.menuList = menuList
  }

  const setIdentifyList = (identifyList: string[]) => {
    state.identifyList = identifyList
  }

  // 判断菜单
  const hasMenu = (path: string) => state.allMenu.findIndex(menu => menu.path === path) > -1

  // 判断权限标识
  const hasIdentify = (identify: string) => state.identifyList[0] === '*' || state.identifyList.includes(identify)

  // 判断权限标识 or 菜单
  const hasPermission = (permission: string | string[]) =>
    (typeof permission === 'string' ? [permission] : permission).every(value => hasIdentify(value) || hasMenu(value))

  return {
    ...toRefs(state),

    setMenuList,
    hasMenu,
    setIdentifyList,
    hasIdentify,
    hasPermission,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
