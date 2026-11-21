import { defineStore } from 'pinia'

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  status: string
  roles: string[]
  permissions: string[]
}

const emptyUserInfo: UserInfo = { id: 0, username: '', nickname: '', avatar: '', status: '', roles: [], permissions: [] }

export const useUserStore = defineStore('user', {
  state: () => ({ userInfo: { ...emptyUserInfo } as UserInfo }),
  getters: {
    isSuperAdmin: state => state.permissions?.includes('*') ?? false,
  },
  actions: {
    setUserInfo(value: Partial<UserInfo>) {
      this.userInfo = { ...emptyUserInfo, ...value }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    hasPermission(permission: string) {
      return this.userInfo.permissions.includes('*') || this.userInfo.permissions.includes(permission)
    },
    clearUserInfo() {
      this.userInfo = { ...emptyUserInfo }
      localStorage.removeItem('userInfo')
    },
  },
})
