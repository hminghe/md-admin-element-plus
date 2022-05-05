<script setup lang="ts">

</script>

<template>
  <el-container h-screen direction="vertical">
    <LayoutHeader />
    <el-container>
      <LayoutAside />

      <el-container direction="vertical" flex-1 bg="gray-100">
        <LayoutTabs />
        <multi-window-router />
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  overflow: hidden;
}
</style>
