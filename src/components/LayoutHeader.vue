<script lang="ts" setup>
import { loginPath } from '@/modules/user'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'
import { isDark, toggleDark } from '@/composables'

const router = useRouter()

const appName = import.meta.env.VITE_APP_NAME
const userStore = useUserStore()

const { menu } = useLayoutStore()

function onClickLogo() {
  if (menu.isDrawer) {
    menu.isCollapse = false
  }
}

function onClickLogout() {
  userStore.logout()
  router.replace(loginPath)
}
</script>

<template>
  <el-header class="layout-header" height="48px">
    <div class="logo" @click="onClickLogo">
      <img src="/favicon.svg">
      <span class="text-2xl ml-2">{{ appName }}</span>

      <div
        v-if="menu.isDrawer"
        i-ep-expand
        class="text-xl ml-2"
      />
    </div>

    <div style="flex: 1" />
    <el-space>
      <template v-if="!menu.isDrawer">
        <div class="right-item" @click="toggleDark()">
          <div v-if="isDark" i-ep-moon />
          <div v-else i-ep-sunny />
        </div>
        <div class="right-item">
          <div i-ep-help />
          <!-- <Help /> -->
        </div>

        <div class="right-item">
          <el-badge :value="12">
            <div i-ep-bell-filled />
          </el-badge>
        </div>
      </template>

      <div class="right-item">
        <el-dropdown>
          <div class="el-dropdown-link">
            <el-avatar :size="30" :src="userStore.avatar" />
            <div class="nickname">
              {{ userStore.nickname }}
              <div i-ep-arrow-down ml-1 />
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                个人设置
              </el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="onClickLogout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-space>
  </el-header>
</template>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #001529;
}
.logo {
  position: relative;
  display: flex;
  align-items: center;
  transition: padding .3s cubic-bezier(.645,.045,.355,1);

  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
}

.right-item {
  cursor: pointer;
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  // line-height: 48px;
  &:deep {
    .el-badge__content {
      border: none;
    }
  }

  .notification {
    display: block;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .nickname {
    color: #fff;
    margin-left: 8px;
    display: flex;
    align-items: center;
  }
}

</style>
