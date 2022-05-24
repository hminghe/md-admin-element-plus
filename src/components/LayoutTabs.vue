<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMultiWindowStore } from '@/stores/multiWindow'
import { type Window } from '@/components/multi-window/store'

// import dropdown css
import 'element-plus/es/components/dropdown/style/css'

const router = useRouter()
const multiWindowStore = useMultiWindowStore()

const tabContentMenu$ = ref()
const tabContentMenu = reactive({
  show: false,
  top: '',
  left: '',
  window: {} as Window,
  windowIndex: 0,
})
onClickOutside(tabContentMenu$, () => tabContentMenu.show = false)
const onContextMenuWindow = (event: MouseEvent) => {
  let el: HTMLElement | null = null
  for (const item of event.composedPath()) {
    const classList = (item as HTMLElement).classList
    if (classList.contains('el-tabs__item')) {
      el = item as HTMLElement
      break
    }

    if (classList.contains('layout-tabs')) {
      return
    }
  }
  if (!el) {
    return
  }

  const fullPath = el.id.replace(/^tab-/, '')
  const window = multiWindowStore.findWindowByFullPath(fullPath)
  if (window) {
    tabContentMenu.window = window
    tabContentMenu.windowIndex = multiWindowStore.findWindowIndex(window)

    tabContentMenu.show = true
    tabContentMenu.top = `${event.y}px`
    tabContentMenu.left = `${event.x}px`
  }
}

const onSwitchWindow = (fullPath: string) => {
  // TODO add switch intercept
  router.push(fullPath)
}

const onCloseWindow = (fullPath: string) => {
  // TODO add close intercept
  const window = multiWindowStore.findWindowByFullPath(fullPath)!
  window.close()
}

</script>

<template>
  <div class="layout-tabs" @contextmenu.prevent="onContextMenuWindow($event)">
    <el-tabs
      type="card"
      closable
      :model-value="multiWindowStore.currentWindow?.fullPath"
      :before-leave="fullPath => onSwitchWindow(fullPath.toString())"
      @tab-remove="fullPath => onCloseWindow(fullPath.toString())"
    >
      <el-tab-pane
        v-for="tab in multiWindowStore.windows"
        :key="tab.fullPath"
        :name="tab.fullPath"
        :label="tab.name || ''"
      />
    </el-tabs>
  </div>

  <el-card
    v-show="tabContentMenu.show"
    ref="tabContentMenu$"
    class="absolute z-10 transition-none"
    :body-style="{ padding: 0 }"
    :style="{ left: tabContentMenu.left, top: tabContentMenu.top }"
  >
    <ul class="el-dropdown-menu" @click="tabContentMenu.show = false">
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': multiWindowStore.windows.length === 1}"
        @click="tabContentMenu.window.close()"
      >
        关闭
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': multiWindowStore.windows.length === 1}"
        @click="tabContentMenu.window.close('other')"
      >
        关闭其他
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': tabContentMenu.windowIndex === 0}"
        @click="tabContentMenu.window.close('left')"
      >
        关闭左侧
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': tabContentMenu.windowIndex === multiWindowStore.windows.length - 1}"
        @click="tabContentMenu.window.close('right')"
      >
        关闭右侧
      </li>
      <li
        class="el-dropdown-menu__item"
        @click="tabContentMenu.window.refresh()"
      >
        刷新当前页
      </li>
    </ul>
  </el-card>
</template>

<style lang="less" scoped>

.layout-tabs {
  background-color: #fff;
  :deep(.el-tabs) {
    padding-top: 10px;
    .el-tabs__header {
      margin-bottom: 0;
      padding: 0 20px;
    }

    .el-tabs__nav-wrap.is-scrollable {
      padding: 0 10px;
      overflow: visible;
    }

    .el-tabs__nav-prev {
      padding: 0 9px;
      left: -20px
    }
    .el-tabs__nav-next {
      padding: 0 9px;
      right: -20px
    }
  }
}

.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary-light-3);
}

</style>
