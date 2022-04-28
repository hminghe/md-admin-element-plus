<script lang="ts" setup>

</script>

<template>
  <el-empty
    description="抱歉，页面不存在！"
    :image-size="500"
  >
    <template #image>
      <img src="@/assets/404.svg">
    </template>
    <el-button type="primary" @click="$router.back()">
      返回
    </el-button>
  </el-empty>
</template>

<route lang="yaml">
meta:
  multiWindow: false
</route>
