<template>
  <div class="brand-content">
    <div class="brand-logo">O1</div>

    <h1 class="brand-title">欢迎光临</h1>

    <p class="brand-description">这是 O1 Admin 的管理后台，主打轻量易用</p>

    <div class="brand-decoration"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.brand-content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: max-content;
  max-width: 90%;
  transform: translate(-50%, -50%);
  color: #fff;
}

.brand-logo {
  --at-apply: flex items-center justify-center;
  width: 64px;
  height: 64px;
  margin-bottom: 40px;
  border-radius: 18px;
  background: rgb(255 255 255 / 20%);
  font-size: 28px;
  font-weight: 700;
}

.brand-title {
  --at-apply: text-5xl font-bold;
  margin-bottom: 20px;
}

.brand-description {
  --at-apply: text-base;
  color: rgb(255 255 255 / 85%);
}

.brand-decoration {
  position: absolute;
  top: -180px;
  right: -500px;
  z-index: -1;
  width: 600px;
  height: 600px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 50%;
  box-shadow:
    0 0 0 60px rgb(255 255 255 / 5%),
    0 0 0 120px rgb(255 255 255 / 5%);
  pointer-events: none;
}
</style>
