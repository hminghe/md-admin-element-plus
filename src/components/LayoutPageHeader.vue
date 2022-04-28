<script lang="ts" setup>
// import LayoutBreadcrumb from './LayoutBreadcrumb.vue'
defineProps<{
  title?: string
  desc?: string
  hideBreadcrumb?: boolean
}>()
</script>

<template>
  <div class="layout-page-header py-3 px-6 bg-white">
    <LayoutBreadcrumb v-if="hideBreadcrumb !== true" />

    <div v-if="title" class="text-xl mt-3">
      {{ title }}
    </div>
    <div v-if="desc" class="mt-3 color-s">
      {{ desc }}
    </div>
    <slot />
  </div>
</template>

<style lang="less">

.layout-page-header {
  .el-tabs {
    margin-top: 12px;
    margin-bottom: -12px;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__item {
      font-size: 16px;
    }
  }

}

</style>
