import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  // presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import epIcons from '@iconify-json/ep'

const iconPrefix = 'i-'

export default defineConfig({
  shortcuts: [

  ],
  variants: [
    {
      match: (s) => {
        if (s.startsWith(iconPrefix)) {
          return {
            matcher: s,
            selector: (s) => {
              return s.startsWith('.') ? `${s.slice(1)},${s}` : s
            },
          }
        }
      },
    },
  ],
  presets: [
    // presetUno(),
    presetWind(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      prefix: iconPrefix,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    ...'prose prose-sm m-auto text-left'.split(' '),
    ...Object.keys(epIcons.icons.icons).map(name => `${iconPrefix}${epIcons.icons.prefix}-${name}`),
  ],
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
    },
  },
})
