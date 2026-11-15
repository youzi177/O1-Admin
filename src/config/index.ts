export default {
  // 不需要带上token的路径，匹配 URL 中以 /public 或 /login 结尾的路径片段
  publicPath: [/^\/public/, /^\/login/],
}
