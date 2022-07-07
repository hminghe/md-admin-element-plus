<script setup lang="ts">
import type { VNode } from 'vue'
import { useMultiWindowStore, wrapperComponent } from '..'

defineProps<{
  is: VNode
}>()

const store = useMultiWindowStore()

</script>

<template>
  <keep-alive :include="store.keepAliveInclude">
    <component :is="wrapperComponent(is)" />
  </keep-alive>
</template>
