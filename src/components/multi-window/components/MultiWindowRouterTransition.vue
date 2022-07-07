<template>
  <transition
    mode="out-in"
    name="multi-window-transition"
    appear
  >
    <slot />
  </transition>
</template>

<style>
.multi-window-transition-enter-active, .multi-window-transition-leave-active {
  transition-property: opacity, transform;
  transition-duration: .15s;
}

.multi-window-transition-enter-from {
  opacity: .5;
  transform: translateX(-20px);
}

.multi-window-transition-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.multi-window-transition-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.multi-window-transition-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
