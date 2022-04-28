<script setup lang="ts">
const icons = [
  'i-ant-design:account-book-filled',
  'i-ant-design:account-book-outlined',
  'i-ant-design:account-book-twotone',
  'i-ant-design:aim-outlined',
  'i-ant-design:alert-filled',
  'i-ant-design:alert-outlined',
  'i-ant-design:alert-twotone',
  'i-ant-design:alibaba-outlined',
  'i-ant-design:align-center-outlined',
  'i-ant-design:align-left-outlined',
  'i-ant-design:align-right-outlined',
  'i-ant-design:alipay-circle-filled',
  'i-ant-design:alipay-circle-outlined',
  'i-ant-design:alipay-outlined',
  'i-ant-design:alipay-square-filled',
  'i-ant-design:aliwangwang-filled',
  'i-ant-design:aliwangwang-outlined',
  'i-ant-design:aliyun-outlined',
]

const { copy } = useClipboard()

async function onCopyCode(icon: string) {
  await copy(`<div ${icon}></div>`)
  ElMessage.success('复制成功')
}
async function onCopyName(icon: string) {
  await copy(icon)
  ElMessage.success('复制成功')
}
</script>

<template>
  <layout-page-header title="And Design Icons" />
  <el-card m-3 shadow="never">
    <el-alert :closable="false">
      <template #title>
        图标前缀：<strong>i-ant-design:</strong>
        使用方法：<strong>{{ `<div ${icons[0]} ></div>` }}</strong>
      </template>
    </el-alert>
    <flex class="flex-wrap justify-center">
      <flex
        v-for="icon in icons"
        :key="icon"
        class="cursor-pointer flex-col items-center justify-center w-150px h-120px hover:scale-110"
      >
        <div :class="`text-2xl ${icon}`" />
        <div class="my-2 text-xs">
          {{ icon.replace('i-ant-design:', '') }}
        </div>
        <el-button-group size="small">
          <el-button @click="onCopyCode(icon)">
            代码
          </el-button>
          <el-button @click="onCopyName(icon)">
            名称
          </el-button>
        </el-button-group>
      </flex>
    </flex>
  </el-card>
</template>

<style>
.icon {
  cursor: pointer;
}
</style>

<route lang="yaml">
meta:
  name: Ant Design Icons
</route>
