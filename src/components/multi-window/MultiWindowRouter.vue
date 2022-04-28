<script setup lang="ts">
import { computed } from 'vue'
import { useMultiWindowStore } from '@/stores/multiWindow'

const store = useMultiWindowStore()
const keepAliveInclude = computed(() => store.windows.map(item => item.componentName))
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="keepAliveInclude">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
