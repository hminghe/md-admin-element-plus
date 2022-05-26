<script lang="ts" setup>
const date = Date.now()
console.log('monitor date', date)
</script>

<template>
  <layout-page-header />
  <div>Monitor - {{ date }}</div>
</template>
