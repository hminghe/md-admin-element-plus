<script setup lang="ts">
import { getCurrentWindow } from '@vue-plus/multi-window'

const currentWindow = getCurrentWindow()
</script>

<template>
  <layout-page-header title="多窗口测试" />
  <div m3>
    <el-button @click="currentWindow?.close()">
      后退并关闭页面
    </el-button>
    <el-button @click="$router.back()">
      后退不关闭页面
    </el-button>
  </div>
</template>

<route lang="yaml">
meta:
  name: 多窗口测试
</route>
