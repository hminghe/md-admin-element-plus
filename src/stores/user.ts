import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { usePermissionStore } from './permission'
import { type UserInfoResponse, getUserInfo } from '@/api/user'

export interface UserState {
  token: string
  username: string
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  const { setIdentifyList, setMenuList } = usePermissionStore()

  const state = reactive<UserState>({
    token: localStorage.getItem('MDAdminToken') || '',
    username: '',
    nickname: '',
    avatar: '',
  })

  const isLogin = computed(() => {
    return state.token
  })

  function setUserInfo(payload: UserInfoResponse) {
    const { permission, ...user } = payload
    if (user.token !== state.token) {
      localStorage.setItem('MDAdminToken', user.token)
    }

    Object.assign(state, user)

    setIdentifyList(permission.identifyList)
    setMenuList(permission.menuList)
  }

  function initUser() {
    return getUserInfo()
      .then(setUserInfo)
  }

  function logout() {
    localStorage.removeItem('MDAdminToken')
  }

  return {
    ...toRefs(state),

    isLogin,
    setUserInfo,

    initUser,
    logout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
