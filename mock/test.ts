// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/get',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
  {
    url: '/api/login/test',
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
