<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="flex flex-col items-center text-center">
      <!-- 404 数字 -->
      <div class="relative mb-6">
        <div
          class="text-[150px] font-bold leading-none tracking-widest text-indigo-100 select-none"
        >
          404
        </div>
      </div>

      <!-- 提示信息 -->
      <h2 class="mb-3 text-2xl font-semibold text-gray-800">哎呀，页面走丢了！</h2>

      <p class="mb-8 text-sm text-gray-500">你访问的页面不存在、已被删除，或者地址输入有误。</p>

      <!-- 操作按钮 -->
      <div class="flex justify-center gap-4">
        <el-button @click="router.back()">返回上一页</el-button>
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePage({
  name: '404',
  meta: {
    requiresAuth: false,
    title: '404页面',
    layout: false,
  },
})

const router = useRouter()
</script>
