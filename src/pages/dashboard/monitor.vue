<script lang="ts" setup>
const date = Date.now()
console.log('monitor date', date)
</script>

<template>
  <layout-page>
    <div>Monitor - {{ date }}</div>
  </layout-page>
</template>
