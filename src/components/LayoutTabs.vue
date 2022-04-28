<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMultiWindowStore } from '@/stores/multiWindow'
import { type Window } from '@/components/multi-window/store'

import 'element-plus/es/components/tabs/style/css'

type RefElement = HTMLElement | null

interface Scrollable {
  next?: boolean
  prev?: number
}
const router = useRouter()
const multiWindowStore = useMultiWindowStore()

const scrollable = ref<false | Scrollable>(false)
const navOffset = ref(0)

const navScroll$ = ref<RefElement>(null)
const nav$ = ref<RefElement>(null)
// const navWrap$ = ref<RefElement>(null)

const onClickPerv = () => {
  const containerSize = navScroll$.value?.offsetWidth || 0
  const currentOffset = navOffset.value

  if (!currentOffset) {
    return
  }

  const newOffset
    = currentOffset > containerSize ? currentOffset - containerSize : 0

  navOffset.value = newOffset
}

const onClickNext = () => {
  const navSize = nav$.value?.offsetWidth || 0
  const containerSize = navScroll$.value?.offsetWidth || 0
  const currentOffset = navOffset.value

  if (navSize - currentOffset <= containerSize) {
    return
  }

  const newOffset
    = navSize - currentOffset > containerSize * 2
      ? currentOffset + containerSize
      : navSize - containerSize

  navOffset.value = newOffset
}

const tabContentMenu$ = ref()
const tabContentMenu = reactive({
  show: false,
  top: '',
  left: '',
  current: 0,
})
onClickOutside(tabContentMenu$, () => tabContentMenu.show = false)
const onContextMenuWindow = (event: MouseEvent, index: number) => {
  tabContentMenu.show = true
  tabContentMenu.top = `${event.y}px`
  tabContentMenu.left = `${event.x}px`
  tabContentMenu.current = index
}

const onClickWindow = (window: Window) => {
  return router.push(window.fullPath)
}

const onClickCloseWindow = (window: Window) => {
  window.close()
}

const onClickCloseOtherWindow = (command = 'other') => {
  const { current } = tabContentMenu
  multiWindowStore.closeWindowForOther(multiWindowStore.windows[current], command)
}

const isRefreshing = refAutoReset(false, 1000)
const onClickRefresh = async(index: number) => {
  if (isRefreshing.value) {
    return
  }
  isRefreshing.value = true
  const tab = multiWindowStore.windows[index]
  if (!multiWindowStore.hasCurrentWindow(tab)) {
    onClickWindow(tab)
  }

  tab.refresh()
}

const update = () => {
  if (!nav$.value || !navScroll$.value) {
    return
  }
  const navSize = nav$.value.offsetWidth
  const containerSize = navScroll$.value?.offsetWidth
  const currentOffset = navOffset.value

  if (containerSize < navSize) {
    const currentOffset = navOffset.value
    scrollable.value = (scrollable.value || {}) as Scrollable
    scrollable.value.prev = currentOffset
    scrollable.value.next = currentOffset + containerSize < navSize
    if (navSize - currentOffset < containerSize) {
      navOffset.value = navSize - containerSize
    }
  } else {
    scrollable.value = false
    if (currentOffset > 0) {
      navOffset.value = 0
    }
  }
}

onMounted(() => {
  update()
})

onUpdated(() => {
  update()
})

</script>

<template>
  <div v-if="multiWindowStore.windows.length" class="el-tabs el-tabs--card el-tabs--top">
    <div class="el-tabs__header is-top">
      <div ref="navWrap$" class="el-tabs__nav-wrap is-scrollable is-top">
        <template v-if="scrollable">
          <span class="el-tabs__nav-prev" @click="onClickPerv">
            <i i-ep-arrow-left />
          </span>
          <span class="el-tabs__nav-next" @click="onClickNext">
            <i i-ep-arrow-right />
          </span>
        </template>
        <div ref="navScroll$" class="el-tabs__nav-scroll">
          <div
            ref="nav$"
            class="el-tabs__nav is-top"
            :style="{ transform: `translateX(-${navOffset}px)` }"
          >
            <div
              v-for="(tab, index) in multiWindowStore.windows"
              :key="tab.fullPath"
              :class="{ 'is-active': multiWindowStore.hasCurrentWindow(tab) }"
              class="el-tabs__item is-top is-closable"
              @click="onClickWindow(tab)"
              @contextmenu.prevent="onContextMenuWindow($event, index)"
            >
              <div flex items-center space-x-1>
                <span class="name">{{ tab.name }}</span>
                <el-icon
                  v-if="multiWindowStore.hasCurrentWindow(tab)"
                  :class="{'animate-spin': isRefreshing}"
                  class="refresh"
                  @click.stop="onClickRefresh(index)"
                >
                  <div i-ep-refresh-right />
                </el-icon>
                <el-icon
                  v-if="multiWindowStore.windows.length !== 1"
                  class="is-icon-close"
                  @click.stop="onClickCloseWindow(tab)"
                >
                  <div i-ep-close />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        @click="onClickCloseOtherWindow()"
      >
        关闭其他
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': tabContentMenu.current === 0}"
        @click="onClickCloseOtherWindow('left')"
      >
        关闭左侧
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': tabContentMenu.current === multiWindowStore.windows.length - 1}"
        @click="onClickCloseOtherWindow('right')"
      >
        关闭右侧
      </li>
      <li
        class="el-dropdown-menu__item"
        @click="onClickRefresh(tabContentMenu.current)"
      >
        刷新当前页
      </li>
    </ul>
  </el-card>
</template>

<style lang="less" scoped>
@keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(-90deg);}
  50%{-webkit-transform:rotate(-180deg);}
  75%{-webkit-transform:rotate(-270deg);}
  100%{-webkit-transform:rotate(-360deg);}
}

.turn {
   animation:turn 1s linear;
}

.el-tabs {
  padding-top: 10px;
  user-select: none;
  background-color: #fff;
}

.el-tabs__header {
  margin: 0;
}

.el-tabs__nav-wrap.is-scrollable {
  padding: 0 26px;
}

.el-tabs__nav-prev, .el-tabs__nav-next {
  padding: 0 6px;
  > i {
    display: inline-block;
  }
}

.tabs-item {
  display: inline-flex;
  align-items: center;
  .name + .el-icon {
    margin-left: 8px;
  }

  .el-icon {
    margin-left: 4px;

    &.refresh, &.close {
      color: var(--el-text-color-primary);
      &:hover {
        color: var(--el-color-primary);
      }
    }

    &.favicon {
      margin-left: 0;
      margin-right: 4px;
    }

    &.close {
      overflow: hidden;
      width: 0;
      transition: width var(--el-transition-duration) cubic-bezier(.645,.045,.355,1);
      // margin-left: 4px;
    }
  }

  &.is-active, &:hover {
    .el-icon.close {
      width: 14px;
    }
  }
}

.el-tabs__item {
  display: inline-flex;
  align-items: center;
  // &.is-active {
  //   background-color: #fff;
  // }
}

.el-dropdown-menu__item:hover {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary-light-3);
}

</style>
