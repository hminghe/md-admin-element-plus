import { defineStore } from 'pinia'
import useStore from '@/components/multi-window/store'

export const useMultiWindowStore = defineStore('multiWindow', useStore)

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useMultiWindowStore, import.meta.hot))
// }
