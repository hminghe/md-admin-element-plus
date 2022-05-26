<template>
  <transition
    mode="out-in"
    name="window-transition"
    appear
  >
    <slot />
  </transition>
</template>

<style>
.window-transition-enter-active {
  transition-property: opacity, transform;
  transition-duration: .2s;
}

.window-transition-enter-from {
  opacity: .5;
  transform: translateX(-20px);
}

.window-transition-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* .window-transition-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.window-transition-leave-to {
  opacity: 0;
  transform: translateX(20px);
} */
</style>
