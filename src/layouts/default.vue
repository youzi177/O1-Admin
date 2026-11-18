<template>
  <div>
    <el-container>
      <el-header>
        <OHeader></OHeader>
      </el-header>
      <el-container>
        <el-aside>
          <OAside></OAside>
        </el-aside>
        <el-main>
          <OTagList></OTagList>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import OHeader from './components/OHeader/index.vue'
// import OMenu from './components/OMenu.vue'
import OAside from './components/OAside/index.vue'
import OTagList from './components/OTagList.vue'
</script>

<style></style>
