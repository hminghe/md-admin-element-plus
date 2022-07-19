import App from './App.vue'
import router from './router'
import type { UserModule } from './types'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
// import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import './mocks/index'

const app = createApp(App)
app.use(router)

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({
    app,
    router,
  }))

app.mount('#app')
