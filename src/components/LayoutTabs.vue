<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { OnClickOutside } from '@vueuse/components'
import { useMultiWindowStore } from '@/stores/multiWindow'
import { type Window } from '@/components/multi-window/store'

// import dropdown css
import 'element-plus/es/components/dropdown/style/css'

const router = useRouter()
const multiWindowStore = useMultiWindowStore()

const contextMenu$ = ref()
const contextMenu = reactive({
  show: false,
  top: '',
  left: '',
  window: {} as Window,
  windowIndex: 0,
})
onClickOutside(contextMenu$, () => contextMenu.show = false)

const contextMenuItems = computed(() => {
  const { windows } = multiWindowStore
  const { window, windowIndex } = contextMenu
  return [
    {
      label: '刷新',
      disabled: false,
      action: () => {
        if (!multiWindowStore.hasCurrentWindow(window)) {
          onSwitchWindow(window.fullPath)
        }
        window.refresh()
      },
    },
    {
      label: '关闭',
      disabled: windows.length === 1,
      action: () => window.close(),
    },
    {
      label: '关闭其他',
      disabled: windows.length === 1,
      action: () => window.close('other'),
    },
    {
      label: '关闭左侧',
      disabled: windowIndex === 0,
      action: () => window.close('left'),
    },
    {
      label: '关闭右侧',
      disabled: windowIndex === windows.length - 1,
      action: () => window.close('right'),
    },
  ]
})

function onShowContentMenu(event: MouseEvent) {
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
    contextMenu.window = window
    contextMenu.windowIndex = multiWindowStore.findWindowIndex(window)

    contextMenu.show = true
    contextMenu.top = `${event.y}px`
    contextMenu.left = `${event.x}px`
  }
}

function onSwitchWindow(fullPath: string) {
  if (multiWindowStore.findWindowByFullPath(fullPath)) {
    // TODO add switch intercept
    router.push(fullPath)
  }
}

function onCloseWindow(fullPath: string) {
  // TODO add close intercept
  const window = multiWindowStore.findWindowByFullPath(fullPath)!
  window.close()
}

</script>

<template>
  <div class="layout-tabs" @contextmenu.prevent="onShowContentMenu($event)">
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
    v-if="contextMenu.show"
    ref="contextMenu$"
    class="absolute z-10 transition-none"
    :body-style="{ padding: 0 }"
    :style="{ left: contextMenu.left, top: contextMenu.top }"
  >
    <ul class="el-dropdown-menu" @click="contextMenu.show = false">
      <li
        v-for="item in contextMenuItems"
        :key="item.label"
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': item.disabled}"
        @click="item.action"
      >
        {{ item.label }}
      </li>
    </ul>
  </el-card>
</template>

<style lang="less" scoped>

.layout-tabs {
  background-color: var(--el-bg-color-overlay);
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
