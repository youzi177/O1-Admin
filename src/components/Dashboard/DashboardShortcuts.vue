<template>
  <div class="shortcut-grid">
    <button v-for="item in shortcuts" :key="item.label" type="button" @click="navigate(item.path)">
      <el-icon :style="{ color: item.color }"><component :is="item.icon" /></el-icon><span>{{ item.label }}</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Bell, ChatLineSquare, Coin, Goods, Picture, Setting, Ticket, User } from '@element-plus/icons-vue'
const router = useRouter()
const shortcuts = [
  { label:'用户管理',path:'/user/list',icon:User,color:'#409eff' }, { label:'商品管理',path:'/goods/list',icon:Goods,color:'#8b5cf6' },
  { label:'订单管理',path:'/order/list',icon:Coin,color:'#d946ef' }, { label:'评价管理',path:'/comment/list',icon:ChatLineSquare,color:'#14b8a6' },
  { label:'图库管理',path:'/image/list',icon:Picture,color:'#f56c6c' }, { label:'公告管理',path:'/notice/list',icon:Bell,color:'#10b981' },
  { label:'系统配置',path:'/system/settings',icon:Setting,color:'#909399' }, { label:'优惠券',path:'/coupon/list',icon:Ticket,color:'#f59e0b' },
]
function navigate(path:string){ void router.push(path) }
</script>
<style scoped>
.shortcut-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px}
button{display:flex;min-width:0;min-height:78px;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--o1-text-primary);background:var(--o1-bg-container);border:1px solid var(--o1-border-color);border-radius:6px;cursor:pointer}
button:hover{background:var(--o1-bg-hover);border-color:var(--o1-color-primary)}
.el-icon{font-size:20px}
span{font-size:13px}
@media(max-width:1100px){.shortcut-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
</style>
