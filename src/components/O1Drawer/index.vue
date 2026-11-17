<template>
  <el-drawer
    v-bind="$attrs"
    :model-value="modelValue"
    :title="title"
    :size="drawerSize"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    /** 桌面端抽屉宽度，支持 Element Plus size 的 CSS 长度 */
    size?: string | number
    /** 移动端抽屉宽度 */
    mobileSize?: string | number
    /** 小于等于该宽度时使用移动端尺寸 */
    mobileBreakpoint?: number
  }>(),
  {
    title: '',
    size: 'clamp(450px, 45vw, 720px)',
    mobileSize: '100%',
    mobileBreakpoint: 480,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 在通用抽屉内部统一判断屏幕尺寸，业务组件不再重复监听 resize
const isMobile = useMediaQuery(() => `(max-width: ${props.mobileBreakpoint}px)`)

// 桌面端使用 clamp 限制宽度，移动端默认占满屏幕
const drawerSize = computed(() => {
  return isMobile.value ? props.mobileSize : props.size
})
</script>
