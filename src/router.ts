import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { setupMultiWindow } from '@/components/multi-window/setupMultiWindow'
import { useMultiWindowStore } from '@/stores/multiWindow'

const routes = setupMultiWindow(setupLayouts(generatedRoutes), useMultiWindowStore)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
