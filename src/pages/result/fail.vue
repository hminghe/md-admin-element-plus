<script setup lang="ts">

</script>

<template>
  <el-card m-3>
    <el-result
      icon="error"
      title="提交失败"
      sub-title="请核对并修改以下信息后，再重新提交。"
    >
      <template #extra>
        <el-button type="primary" @click="$router.back()">
          返回修改
        </el-button>
      </template>
    </el-result>
  </el-card>
</template>

<route lang="yaml">
meta:
  multiWindow: false
</route>
