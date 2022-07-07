<template>
  <router-view v-slot="{ Component }">
    <multi-window-router-transition>
      <multi-window-keep-alive :is="Component" />
    </multi-window-router-transition>
  </router-view>
</template>
