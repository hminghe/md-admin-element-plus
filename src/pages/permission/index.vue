<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user'
import { usePermissionStore } from '@/stores/permission'
import { useMultiWindowStore } from '@/components/multi-window'
const userStore = useUserStore()
const { hasPermission } = usePermissionStore()
const multiWindowStore = useMultiWindowStore()

async function switchUser(username: string) {
  const userInfo = await login(username, '123456')
  console.log(username, userInfo)
  userStore.setUserInfo(userInfo)
  // 切换权限，关闭一下其他页面
  multiWindowStore.closeWindowForOther()
}
</script>

<template>
  <layout-page-header title="权限测试" />

  <div m3 space="y-3">
    <div>
      <el-button @click="switchUser('admin')">
        切换 admin
      </el-button>

      <el-button @click="switchUser('test')">
        切换 test
      </el-button>

      <el-button @click="switchUser('dev')">
        切换 dev
      </el-button>
    </div>

    <el-alert
      v-if="hasPermission('test')"
      title="test可见"
      type="success"
      effect="dark"
    />

    <el-alert
      v-if="hasPermission('dev')"
      title="dev可见"
      type="info"
      effect="dark"
    />

    <el-alert
      v-if="hasPermission('/dashboard')"
      title="有 /dashboard 菜单权限可见"
      type="warning"
      effect="dark"
    />
  </div>
</template>

<route lang="yaml">
meta:
  name: 权限演示
</route>
