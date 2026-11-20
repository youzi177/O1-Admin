<template>
  <div class="reminders">
    <section v-for="section in sections" :key="section.title" class="panel">
      <header><span>{{ section.title }}</span><el-tag type="danger" effect="plain" size="small">{{ section.hint }}</el-tag></header>
      <div class="items"><button v-for="item in section.items" :key="item.label" @click="navigate(item.path)"><strong>{{ item.value }}</strong><span>{{ item.label }}</span></button></div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DashboardReminderItem } from '@/types/api/dashboard'
const props=defineProps<{shopItems:DashboardReminderItem[];tradeItems:DashboardReminderItem[]}>()
const sections=computed(()=>[{title:'店铺及商品提醒',hint:'需要关注',items:props.shopItems},{title:'交易提醒',hint:'待处理事项',items:props.tradeItems}])
const router=useRouter()
function navigate(path:string){void router.push(path)}
</script>
<style scoped>
.reminders{display:flex;min-width:0;flex-direction:column;gap:12px}
.panel{min-width:0;padding-bottom:14px;background:var(--o1-bg-container);border:1px solid var(--o1-border-color);border-radius:6px}
header{display:flex;min-height:48px;align-items:center;justify-content:space-between;gap:8px;padding:0 14px;color:var(--o1-text-primary);border-bottom:1px solid var(--o1-border-color)}
.items{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px 14px 0}
button{display:flex;min-width:0;min-height:82px;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:var(--o1-bg-hover);border:0;border-radius:4px;cursor:pointer}
button:hover{outline:1px solid var(--o1-color-primary)}
strong{color:var(--o1-text-primary);font-size:20px}span{color:var(--o1-text-secondary);font-size:12px}
@media(max-width:480px){.items{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding-inline:10px}}
</style>
