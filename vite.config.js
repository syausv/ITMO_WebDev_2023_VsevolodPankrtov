// vite.config.ts
import UnoCSS from 'unocss/vite'
import {presetUno} from "unocss";
import presetIcons from '@unocss/preset-icons'
export default {
  plugins: [
    UnoCSS({

      include: ['./index.html', 'main.js', './src/**/**.js'],
      presets: [
        presetUno(),
        presetIcons({ /* options */ }),
        // ...other presets
      ], // disable default preset
      rules: [
        // your custom rules
      ],
    }),
  ],
}
