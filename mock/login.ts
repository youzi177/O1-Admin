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
          'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTc5NDc3NjAwMH0.',
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
        },
      }
    },
  },
] as MockMethod[]
