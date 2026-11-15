// 登录参数
export interface LoginInfo {
  username: string
  password: string
}

//后端返回的数据格式
//msg返回的时候大部分是string，但是注册的时候返回的对象，所以这里使用泛型，默认string
export interface HttpResponse {
  code: number
  //data不知道返回的什么数据
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  token?: string
  msg?: string
  message?: string
  favs?: number
  count?: number
  lastSign?: Date
  total: number
}
