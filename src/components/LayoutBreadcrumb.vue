<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { type Menu, usePermissionStore } from '@/stores/permission'

const route = useRoute()
const permissionStore = usePermissionStore()

let currentMenu: Menu = {
  name: route.meta.name as string,
  path: route.path,
}
let max = 0
for (const menu of permissionStore.allMenu) {
  if (route.path === menu.path) {
    currentMenu = menu
    break
  }
  if (route.path.includes(menu.path) && menu.path.length > max) {
    max = menu.path.length
    currentMenu.parent = menu
  }
}

const list: Menu[] = []
let menu: Menu = currentMenu
while (menu) {
  list.splice(0, 0, menu)

  if (!menu.parent) {
    break
  }

  menu = menu.parent
}

</script>

<template>
  <el-breadcrumb v-if="list.length > 1" separator="/">
    <el-breadcrumb-item
      v-for="item in list"
      :key="item.path"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
