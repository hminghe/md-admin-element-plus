import { get, post } from '@/utils/request'
import { type PermissionState } from '@/stores/permission'

export interface UserInfoResponse {
  token: string
  username: string
  nickname: string
  avatar: string
  permission: PermissionState
}

export function getUserInfo(): Promise<UserInfoResponse> {
  return get('/user/info')
}

export function login(username: string, password: string): Promise<UserInfoResponse> {
  return post('/user/login', {
    username,
    password,
  })
}

export function logout(): Promise<void> {
  return post('/user/logout')
}
