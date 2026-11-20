<template>
  <div class="shortcut-grid">
    <button v-for="item in shortcuts" :key="item.label" type="button" @click="navigate(item.path)">
      <div class="shortcut-icon" :class="item.icon" :style="{ color: item.color }"></div>
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const shortcuts = [
  { label: '用户管理', path: '/user/list', icon: 'i-ep:user', color: '#409eff' },
  { label: '商品管理', path: '/goods/list', icon: 'i-ep:goods', color: '#8b5cf6' },
  { label: '订单管理', path: '/order/list', icon: 'i-ep:shopping-cart', color: '#d946ef' },
  { label: '评价管理', path: '/comment/list', icon: 'i-ep:chat-line-square', color: '#14b8a6' },
  { label: '图库管理', path: '/image/list', icon: 'i-ep:picture', color: '#f56c6c' },
  { label: '公告管理', path: '/notice/list', icon: 'i-ep:bell', color: '#10b981' },
  { label: '系统配置', path: '/system/settings', icon: 'i-ep:setting', color: '#909399' },
  { label: '优惠券', path: '/coupon/list', icon: 'i-ep:ticket', color: '#f59e0b' },
]

function navigate(path: string) {
  void router.push(path)
}
</script>

<style scoped>
.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 12px;
}

.shortcut-grid button {
  display: flex;
  min-width: 0;
  min-height: 78px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--o1-text-primary);
  background: var(--o1-bg-container);
  border: 1px solid var(--o1-border-color);
  border-radius: 6px;
  cursor: pointer;
}

.shortcut-grid button {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.shortcut-grid button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}

.shortcut-icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.shortcut-grid span {
  font-size: 13px;
}

@media (max-width: 1100px) {
  .shortcut-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
