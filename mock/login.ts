import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/admin/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username !== 'admin' || password !== '123456') {
        return {
          code: 401,
          message: '用户名或密码错误',
          data: null,
        }
      }
      return {
        code: 200,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3OTQ4NjY3MDAsImV4cCI6MTc5NTQ3MTUwMH0.demo_signature',
        message: '登录成功',
        tokenType: 'Bearer',
        expiresIn: 7200,
        data: {
          id: 1,
          username: 'admin',
          nickname: '超级管理员',
          avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin',
          roles: ['super_admin'],
          permissions: ['*'],
          status: '0',
        },
      }
    },
  },
  {
    url: '/api/admin/info',
    method: 'get',
    response: ({ query }) => {
      const { uid } = query

      if (uid === '1') {
        return {
          code: 200,
          data: {
            id: 1,
            username: 'admin',
            nickname: '超级管理员',
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=admin',
            roles: ['super_admin'],
            status: '0',
            permissions: ['*'],
          },
        }
      }

      return {
        code: 404,
        message: '管理员不存在',
        data: null,
      }
    },
  },
] as MockMethod[]
