<script setup lang="ts">
import { MultiWindowRouter } from '@vue-plus/multi-window'
</script>

<template>
  <el-container h-screen direction="vertical">
    <LayoutHeader />
    <el-container>
      <LayoutAside />

      <el-container direction="vertical" class="layout-main">
        <LayoutTabs />
        <MultiWindowRouter />
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  overflow: hidden;
}

.layout-main {
  // background-color: #f0f2f5;
  background-color: var(--el-bg-color-page);
  overflow: auto;
}
</style>
