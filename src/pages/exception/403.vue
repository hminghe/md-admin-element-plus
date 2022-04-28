<script lang="ts" setup>

</script>

<template>
  <el-empty
    description="抱歉，你没有权限访问！"
    :image-size="500"
  >
    <template #image>
      <img src="@/assets/403.svg">
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
