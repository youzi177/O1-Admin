import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 参数说明：
// 参数	作用
// easing	动画效果
// speed	动画速度
// showSpinner	是否显示右侧转圈
// trickleSpeed	自动递增间隔
// minimum	初始最小进度

// 进度条 全局配置
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
})

export default NProgress
