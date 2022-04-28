<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'

const { menu } = useLayoutStore()
</script>

<template>
  <div
    v-if="!menu.isDrawer"
    class="layout-aside"
    :style="{width: menu.isCollapse ? '64px' : '214px'}"
  >
    <el-scrollbar style="flex: 1;">
      <LayoutAsideMenu :collapse="menu.isCollapse" />
    </el-scrollbar>

    <el-menu
      v-if="!menu.isDrawer"
      class="border-t border-black/25"
      :collapse="menu.isCollapse"
    >
      <el-menu-item index="2" @click="menu.isCollapse = !menu.isCollapse">
        <el-icon>
          <div v-if="menu.isCollapse" i-ep-expand />
          <div v-else i-ep-fold />
        </el-icon>
      </el-menu-item>
    </el-menu>
  </div>

  <el-drawer
    v-else
    :model-value="!menu.isCollapse"
    direction="ltr"
    custom-class="layout-aside"
    :with-header="false"
    :size="214"
    @update:model-value="menu.isCollapse = !$event"
  >
    <LayoutAsideMenu />
  </el-drawer>
</template>

<style lang="less">
.layout-aside {
  max-width: 214px;
  transition: var(--el-transition-all);
  background-color: #001529;
  display: flex;
  flex-direction: column;

  .el-menu {
    --el-menu-text-color:rgba(255, 255, 255, 0.65);
    --el-menu-hover-text-color:rgba(255, 255, 255, 0.65);
    --el-menu-bg-color:#001529;
    --el-menu-hover-bg-color:rgb(0, 17, 33);
    --el-menu-active-color:#fff;
    border-right: none;
  }

  .el-drawer__body {
    padding: 0;
  }
}

</style>
