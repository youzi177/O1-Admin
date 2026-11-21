import type { MockMethod } from 'vite-plugin-mock'
import { getMockRolePermissions } from './system'

const accounts = {
  admin: {
    password: '123456',
    id: 1,
    username: 'admin',
    nickname: '超级管理员',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin',
    roles: ['super_admin'],
  },
  finance: {
    password: '123456',
    id: 2,
    username: 'finance',
    nickname: '财务人员',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=finance',
    roles: ['finance'],
  },
} as const

type Account = (typeof accounts)[keyof typeof accounts]

const createUserInfo = (account: Account) => ({
  id: account.id,
  username: account.username,
  nickname: account.nickname,
  avatar: account.avatar,
  roles: [...account.roles],
  permissions: [...new Set(account.roles.flatMap(getMockRolePermissions))],
})

const createToken = (id: number) => {
  const payload = id === 1 ? 'eyJpZCI6IjEiLCJleHAiOjE4OTM0NTYwMDB9' : 'eyJpZCI6IjIiLCJleHAiOjE4OTM0NTYwMDB9'
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.mock_signature`
}

const getAccount = (id: string | number) => Object.values(accounts).find(account => String(account.id) === String(id))

export default [
  {
    url: '/api/admin/login',
    method: 'post',
    response: ({ body }) => {
      const username = String(body.username || '').trim()
      const account = accounts[username as keyof typeof accounts]
      if (!account || account.password !== body.password) return { code: 401, message: '用户名或密码错误', data: null }

      return {
        code: 200,
        token: createToken(account.id),
        message: '登录成功',
        tokenType: 'Bearer',
        expiresIn: 7200,
        data: { ...createUserInfo(account), status: '0' },
      }
    },
  },
  {
    url: '/api/admin/info',
    method: 'get',
    response: ({ query }) => {
      const account = getAccount(query.uid)
      if (!account) return { code: 404, message: '管理员不存在', data: null }
      return { code: 200, data: { ...createUserInfo(account), status: '0' } }
    },
  },
] as MockMethod[]
