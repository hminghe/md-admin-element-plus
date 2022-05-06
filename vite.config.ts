import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      include: [/\.vue$/],
      reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: tag => ['flex'].includes(tag),
        },
      },
    }),

    vueJsx(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // 生产环境按需导入
      resolvers: process.env.NODE_ENV === 'production'
        ? ElementPlusResolver()
        : undefined,
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    // 开发环境完整引入element-plus
    {
      name: 'dev-auto-import-element-plus',
      transform(code, id) {
        if (process.env.NODE_ENV !== 'production' && /src\/main.ts$/.test(id)) {
          return {
            code: `${code};import ElementPlus from 'element-plus';import 'element-plus/dist/index.css';app.use(ElementPlus);`,
            map: null,
          }
        }
      },
    },

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),
  ],

  server: {
    watch: {
      usePolling: true,
    },
  },

  build: {
    // cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('element-plus/es')) {
            return 'element-plus'
          }
        },
      },
    },
  },
})
