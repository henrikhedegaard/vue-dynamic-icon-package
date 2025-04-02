import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { IconPlugin } from 'vue-icon-package' // Use named import

const app = createApp(App)

// Get all SVG modules for discovery
const svgModules = import.meta.glob('/src/assets/svg/**/*.svg', { as: 'raw' })

// Make the icon discovery function available globally
app.config.globalProperties.$getIconCategories = () => {
  const categories = new Map<string, string[]>()
  
  // Add the 'Root' category by default
  categories.set('Root', [])
  
  // Process each SVG path
  Object.keys(svgModules).forEach(path => {
    // Extract the category (folder) and icon name from the path
    // Path format: /src/assets/svg/[category/]icon-name.svg
    const match = path.match(/\/src\/assets\/svg\/(?:([^\/]+)\/)?([^\/]+)\.svg$/)
    
    if (match) {
      const category = match[1] || 'Root' // If no subfolder, use 'Root'
      const iconName = match[2]
      
      // Create the category if it doesn't exist
      if (!categories.has(category)) {
        categories.set(category, [])
      }
      
      // Add the icon to the category
      categories.get(category)?.push(iconName)
    }
  })
  
  // Convert the Map to an array of objects
  return Array.from(categories.entries()).map(([name, icons]) => ({
    name,
    icons: icons.sort() // Sort icons alphabetically
  }))
}

// Register the Icon Plugin
app.use(IconPlugin, {
  // Custom resolver function (Vite example)
  resolver: async (iconPath: string) => { // Add type for iconPath
    try {
      // Assumes icons are in /src/assets/svg/ relative to project root
      // Using 'raw' instead of 'component' to get the SVG content as string
      const path = `/src/assets/svg/${iconPath}.svg` // Construct the full path

      if (svgModules[path]) {
        const svgContent = await svgModules[path]()
        
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
