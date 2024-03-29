import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { setupMultiWindow } from '@vue-plus/multi-window'

const routes = setupMultiWindow(setupLayouts(generatedRoutes))

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
