<template>
  <section class="panel">
    <header>
      <span>订单统计</span><el-segmented v-model="selectedRange" :options="options" size="small" />
    </header>
    <div ref="element" class="chart"></div>
  </section>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { DashboardOrderTrend, DashboardRange } from '@/types/api/dashboard'
const props = defineProps<{ data: DashboardOrderTrend[] }>()
const emit = defineEmits<{ change: [range: DashboardRange] }>()
const options = [
  { label: '近24小时', value: 'day' },
  { label: '近1周', value: 'week' },
  { label: '近1个月', value: 'month' },
]
const selectedRange = ref<DashboardRange>('week')
const element = ref<HTMLDivElement>()
let chart: echarts.ECharts | undefined
let observer: ResizeObserver | undefined
function render() {
  if (!chart) return
  const dark = document.documentElement.classList.contains('dark')
  chart.setOption(
    {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: false,
        },
      },
      grid: { left: 42, right: 18, top: 24, bottom: 32 },
      xAxis: {
        type: 'category',
        data: props.data.map((x) => x.date),
        axisPointer: {
          show: false,
        },
        axisTick: { show: false },
        axisLabel: { color: dark ? '#a3a6ad' : '#606266' },
        axisLine: { lineStyle: { color: dark ? '#414148' : '#dcdfe6' } },
      },
      yAxis: {
        type: 'value',
        min: 0,
        minInterval: 1,
        axisLabel: { color: dark ? '#a3a6ad' : '#606266' },
        splitLine: { lineStyle: { color: dark ? '#35353b' : '#ebeef5' } },
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: props.data.map((x) => x.count),
          barMaxWidth: 34,
          itemStyle: { color: '#626aef', borderRadius: [3, 3, 0, 0] },
        },
      ],
    },
    true,
  )
}
watch(() => props.data, render, { deep: true })
watch(selectedRange, (v) => emit('change', v))
let themeObserver: MutationObserver | undefined
onMounted(() => {
  if (!element.value) return
  chart = echarts.init(element.value)
  render()
  observer = new ResizeObserver(() => chart?.resize())
  observer.observe(element.value)
  themeObserver = new MutationObserver(render)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => {
  observer?.disconnect()
  themeObserver?.disconnect()
  chart?.dispose()
  chart = undefined
})
</script>
<style scoped>
.panel {
  min-width: 0;
  overflow: hidden;
  background: var(--o1-bg-container);
  border: 1px solid var(--o1-border-color);
  border-radius: 6px;
}
header {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  color: var(--o1-text-primary);
  border-bottom: 1px solid var(--o1-border-color);
}
.chart {
  width: 100%;
  height: 300px;
  padding: 12px;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .chart {
    height: 260px;
  }
}
</style>
