<script setup lang="ts">
import { getCurrentWindow, onRefresh } from '@vue-plus/multi-window'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentWindow = getCurrentWindow()

const index = ref(1)
const removeEvent = onRefresh((next) => {
  index.value++
  if (confirm('是否刷新页面')) {
    next()
  }
})

function onClickRemoveEvent() {
  removeEvent()
  ElMessage.success('再点刷新就会重新加载页面组件')
}

function onClickRefresh() {
  currentWindow?.refresh()
}

function onClickRename() {
  // eslint-disable-next-line no-alert
  const name = prompt('请输入名称')
  if (name) {
    currentWindow?.rename(name)
  } else {
    ElMessage.error('请设置名称')
  }
}

function onClickMultiWindow() {
  const name = prompt('你的名称')
  if (name) {
    // 只要URL不一样，就会创建一个新的窗口
    router.push(`/multi-window?hi=${name}`)
  } else {
    ElMessage.error('请输入你的名称')
  }
}

const counter = ref(0)
const timer = setInterval(() => {
  counter.value++
}, 1000)

onBeforeUnmount(() => {
  console.log('刷新页面会触发这个')
  clearInterval(timer)
})

onActivated(() => {
  ElMessage.success('欢迎回来了')
})

</script>

<template>
  <layout-page-header title="多窗口测试" />
  <div m3 space="y-3">
    <el-alert
      v-if="route.query.hi"
      :title="`${route.query.hi}，看看上面 tab 有两个同页面，可以试试来加切换。`"
      type="success"
      effect="dark"
    />
    <div>
      <div>{{ counter }}</div>
      <el-button @click="onClickRefresh">
        刷新页面 ({{ index }})
      </el-button>

      <el-button @click="onClickRemoveEvent">
        删除自定义刷新
      </el-button>
    </div>

    <div>
      <el-button @click="onClickRename">
        修改tab名称
      </el-button>
    </div>

    <div>
      <el-button @click="router.push('/multi-window/page2')">
        详细页
      </el-button>
    </div>

    <div>
      <el-button @click="onClickMultiWindow">
        同页面多窗口
      </el-button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  name: 多窗口测试
</route>
