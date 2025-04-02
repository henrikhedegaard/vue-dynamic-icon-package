import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { IconPlugin } from 'vue-icon-package' // Use named import

const app = createApp(App)

// Register the Icon Plugin
app.use(IconPlugin, {
  // Custom resolver function (Vite example)
  resolver: async (iconPath: string) => { // Add type for iconPath
    try {
      // Assumes icons are in /src/assets/svg/ relative to project root
      // Using 'raw' instead of 'component' to get the SVG content as string
      const modules = import.meta.glob('/src/assets/svg/**/*.svg', { as: 'raw' })
      const path = `/src/assets/svg/${iconPath}.svg` // Construct the full path

      if (modules[path]) {
        const svgContent = await modules[path]()
        
        // Create a wrapper component that renders the SVG content
        return {
          render() {
            return h('div', {
              innerHTML: svgContent,
              style: {
                display: 'inline-block',
                verticalAlign: 'middle'
              }
            })
          }
        }
      }
      console.warn(`Icon not found for path: ${path}`)
      return null
    } catch (error) {
      console.error(`Failed to load icon: ${iconPath}`, error)
      return null
    }
  }
})

app.use(router)

app.mount('#app')
