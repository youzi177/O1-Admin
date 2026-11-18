import { defineConfig, presetWind4, presetIcons, transformerDirectives } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind4(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  // 强制生成动态菜单使用的图标
  safelist: [
    'i-ep:odometer',
    'i-ep:home-filled',
    'i-ep:shop',
    'i-ep:goods',
    'i-ep:tickets',
    'i-ep:document',
    'i-ep:user',
    'i-ep:setting',
    'i-ep:tools',
  ],
  transformers: [transformerDirectives()],
})
