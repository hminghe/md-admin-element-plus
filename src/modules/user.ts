import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { type UserModule } from '@/types'

export const loginPath = '/user/login'

export const install: UserModule = ({ router }) => {
  router.beforeEach(async(to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    if (!to.meta.layout || to.path === '/') {
      // 未获取用户信息
      if (!userStore.username) {
        if (!userStore.isLogin) {
          return next(loginPath)
        }

        await userStore.initUser()
      }

      // 判断菜单权限
      if (to.meta.isMenu && !permissionStore.hasMenu(to.path)) {
        return next('/403')
      }

      if (to.path === '/') {
        let menu = permissionStore.allMenu[0]
        while (menu.children) {
          menu = menu.children[0]
        }
        return next(menu.path)
      }
    }
    next()
  })
}
