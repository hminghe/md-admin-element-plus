<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <el-empty
      description="抱歉，页面不存在！"
      :image-size="500"
    >
      <template #image>
        <img src="@/assets/404.svg">
      </template>
      <el-button type="primary" @click="router.back()">
        返回
      </el-button>
    </el-empty>
  </main>
</template>
