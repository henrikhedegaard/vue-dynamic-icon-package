# Vue Icon Package

A flexible Vue 3 icon system that allows you to use your own SVG icons without bundling them in the package.

## Features

- 🔄 Dynamic icon loading from your project's icon directory
- 📁 Support for subfolders to organize icons
- 🎨 Tailwind CSS compatible
- 📏 Flexible sizing options
- 🔌 Simple plugin-based setup

## Installation

```bash
npm install vue-icon-package
# or
yarn add vue-icon-package
```

## Setup

### 1. Register the plugin in your main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import IconPlugin from 'vue-icon-package'

// Setup the icon plugin with your project's icon directory
const app = createApp(App)

app.use(IconPlugin, {
  // Base path to your icons directory (optional)
  basePath: 'icons',
  
  // Custom resolver function to load your icons
  resolver: async (iconPath) => {
    // Example resolver for Vite
    try {
      // This works with Vite's glob import feature
      const modules = import.meta.glob('/src/assets/icons/**/*.svg', { as: 'component' })
      const path = `/src/assets/${iconPath}.svg`
      
      if (modules[path]) {
        return await modules[path]()
      }
      return null
    } catch (error) {
      console.error(`Failed to load icon: ${iconPath}`, error)
      return null
    }
  }
})

app.mount('#app')
```

### 2. Organize your icons

Place your SVG icons in your project's icon directory (e.g., `/src/assets/icons/`). You can organize them in subfolders if desired.

```
src/
├── assets/
│   ├── icons/
│   │   ├── common/
│   │   │   ├── user.svg
│   │   │   └── settings.svg
│   │   ├── social/
│   │   │   ├── facebook.svg
│   │   │   └── twitter.svg
│   │   └── home.svg
```

## How It Works

This icon package takes a different approach from traditional icon libraries:

1. **No Bundled Icons**: Unlike other icon packages, this one doesn't include any SVG files. Instead, it provides the infrastructure to use your own icons.

2. **Dynamic Loading**: The package dynamically loads SVG icons from your project's directory structure at runtime.

3. **Plugin Configuration**: You configure where your icons are located and how they should be loaded through the Vue plugin system.

4. **Component API**: The `Icon` component provides a simple, consistent API for using icons throughout your application.

## Benefits

- **Zero Icon Bloat**: Your bundle only includes the infrastructure code, not hundreds of unused icons.
- **Use Your Own Design System**: Perfect for projects with custom icon sets or design systems.
- **Automatic Discovery**: No need to manually register each new icon you add to your project.
- **Folder Organization**: Keep your icons organized in logical subfolders.
- **Consistent API**: Use the same component API regardless of which icons you're using.
- **Tailwind Integration**: Seamlessly works with Tailwind CSS classes.
- **TypeScript Support**: Includes TypeScript type definitions.

## Usage

```vue
<template>
  <!-- Basic usage -->
  <Icon name="home" />
  
  <!-- With subfolder -->
  <Icon name="user" folder="common" />
  
  <!-- With size and class -->
  <Icon name="facebook" folder="social" size="32" class="text-blue-500" />
</template>

<script>
export default {
  // The Icon component is globally registered by the plugin
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | String | (required) | The filename of the SVG icon (without extension) |
| `folder` | String | `''` | Optional subfolder within the icons directory |
| `size` | String/Number | `24` | Size of the icon (number for pixels, string for custom units) |
| `class` | String | `''` | Additional CSS classes (e.g. Tailwind classes) |

## Custom Configuration

### Using with different build systems

#### Webpack

```javascript
app.use(IconPlugin, {
  basePath: 'icons',
  resolver: async (iconPath) => {
    try {
      // For webpack, you might need a different approach
      return await import(`@/assets/${iconPath}.vue`)
    } catch (error) {
      return null
    }
  }
})
```

#### Nuxt.js

```javascript
// plugins/icons.js
import { IconPlugin } from 'vue-icon-package'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IconPlugin, {
    basePath: 'icons',
    resolver: async (iconPath) => {
      // Implement Nuxt-specific resolver
    }
  })
})
```

## License

MIT
