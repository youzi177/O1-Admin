<template>
  <div>
    <el-result icon="warning" title="404提示" sub-title="您的页面找不到">
      <template #extra>
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
</script>

<style></style>
