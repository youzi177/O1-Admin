<template>
  <section class="stat-card">
    <header><span>{{ title }}</span><el-tag size="small" effect="plain" :type="tagType">{{ tag }}</el-tag></header>
    <strong>{{ displayValue }}</strong>
    <footer><span>{{ footerLabel }}</span><span>{{ footerValue }}</span></footer>
  </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
const props = withDefaults(defineProps<{ title: string; value: number; tag: string; footerLabel: string; footerValue: string | number; format?: 'number' | 'currency'; tagType?: 'success' | 'info' | 'warning' | 'danger' | 'primary' }>(), { format: 'number', tagType: 'info' })
const displayValue = computed(() => new Intl.NumberFormat('zh-CN', props.format === 'currency' ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : {}).format(props.value))
</script>
<style scoped>
.stat-card{min-width:0;padding:18px;background:var(--o1-bg-container);border:1px solid var(--o1-border-color);border-radius:8px}
header,footer{display:flex;align-items:center;justify-content:space-between;gap:10px;color:var(--o1-text-secondary);font-size:13px}
strong{display:block;margin:20px 0;color:var(--o1-text-primary);font-size:30px;line-height:1.2}
footer{padding-top:12px;border-top:1px solid var(--o1-border-color)}
footer span:last-child{color:var(--o1-text-primary)}
</style>
