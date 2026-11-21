<template>
  <section class="stat-card">
    <header>
      <span>{{ title }}</span>
      <el-tag size="small" effect="plain" :type="tagType">{{ tag }}</el-tag>
    </header>
    <strong>{{ displayValue }}</strong>
    <footer>
      <span>{{ footerLabel }}</span>
      <span>{{ displayFooterValue }}</span>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    value: number
    tag: string
    footerLabel: string
    footerValue: string | number
    format?: 'number' | 'currency'
    tagType?: 'success' | 'info' | 'warning' | 'danger' | 'primary'
  }>(),
  { format: 'number', tagType: 'info' },
)

const animatedValue = ref(0)
const animatedFooterValue = ref(0)
const footerSuffix = ref('')
const footerDecimals = ref(0)
let valueFrame = 0
let footerFrame = 0

const numberFormatter = computed(
  () =>
    new Intl.NumberFormat(
      'zh-CN',
      props.format === 'currency' ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : {},
    ),
)

const displayValue = computed(() => numberFormatter.value.format(animatedValue.value))
const displayFooterValue = computed(() => {
  const formatted = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: footerDecimals.value,
    maximumFractionDigits: footerDecimals.value,
  }).format(animatedFooterValue.value)

  return formatted + footerSuffix.value
})

function runCountUp(
  target: number,
  setter: (value: number) => void,
  previousFrame: number,
  decimals = 0,
) {
  cancelAnimationFrame(previousFrame)

  const startValue = 0
  const duration = 1200
  const startTime = performance.now()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion || !Number.isFinite(target)) {
    setter(target)
    return 0
  }

  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    // easeOutCubic：开始较快，接近目标时平滑减速
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    const current = startValue + (target - startValue) * easedProgress

    setter(Number(current.toFixed(decimals)))

    if (progress < 1) {
      return requestAnimationFrame(tick)
    }

    setter(target)
    return 0
  }

  return requestAnimationFrame(tick)
}

function animateValue() {
  valueFrame = runCountUp(
    props.value,
    (value) => (animatedValue.value = value),
    valueFrame,
    props.format === 'currency' ? 2 : 0,
  )
}

function animateFooterValue() {
  const rawValue = String(props.footerValue)
  const match = rawValue.match(/^([+-]?[\d,]+(?:\.\d+)?)(.*)$/)

  if (!match) {
    footerSuffix.value = rawValue
    animatedFooterValue.value = 0
    return
  }

  // 明确处理可能为 undefined 的情况
  const numericPart = match[1] ?? ''
  const suffix = match[2] ?? ''

  const numericValue = Number(numericPart.replace(/,/g, ''))
  footerSuffix.value = suffix
  footerDecimals.value = (numericPart.split('.')[1] || '').length

  footerFrame = runCountUp(
    numericValue,
    (value) => (animatedFooterValue.value = value),
    footerFrame,
    footerDecimals.value,
  )
}

onMounted(() => {
  animateValue()
  animateFooterValue()
})

watch(() => props.value, animateValue)
watch(() => props.footerValue, animateFooterValue)

onBeforeUnmount(() => {
  cancelAnimationFrame(valueFrame)
  cancelAnimationFrame(footerFrame)
})
</script>

<style scoped>
.stat-card {
  min-width: 0;
  padding: 18px;
  background: var(--o1-bg-container);
  border: 1px solid var(--o1-border-color);
  border-radius: 8px;
}

header,
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--o1-text-secondary);
  font-size: 13px;
}

strong {
  display: block;
  margin: 20px 0;
  color: var(--o1-text-primary);
  font-size: 30px;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

footer {
  padding-top: 12px;
  border-top: 1px solid var(--o1-border-color);
}

footer span:last-child {
  color: var(--o1-text-primary);
  font-variant-numeric: tabular-nums;
}
</style>
