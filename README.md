# Vue Icon Package

A flexible Vue 3 icon system that allows you to use your own SVG icons without bundling them in the package.
It allows you to simply add you own svg icons to a project and then you can insert them as <Icon name="iconName" />.
Works as a great supplement to Lucide Icons.
See demo in branch 'project-icon-websites'.

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
      const modules = import.meta.glob('/src/assets/icons/**/*.svg', {
        as: 'component',
      })
      const path = `/src/assets/${iconPath}.svg`

      if (modules[path]) {
        return await modules[path]()
      }
      return null
    } catch (error) {
      console.error(`Failed to load icon: ${iconPath}`, error)
      return null
    }
  },
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
│   │   └── alert-triangle.svg
└── main.js
```

Make sure your build tool (like Vite or Webpack) is configured to handle SVG imports. For Vite, you might use a plugin like `vite-svg-loader` or rely on Vite's built-in asset handling if your resolver manages it.

## Usage

Once the plugin is set up, you can use the `<Icon>` component in your Vue templates:

```vue
<template>
  <div>
    <!-- Basic icon -->
    <Icon name="alert-triangle" />

    <!-- Icon from a subfolder -->
    <Icon name="user" folder="common" />

    <!-- Icon with custom size -->
    <Icon name="settings" folder="common" size="32" />

    <!-- Icon with Tailwind CSS classes -->
    <Icon
      name="facebook"
      folder="social"
      class="text-blue-500 hover:text-blue-700"
    />

    <!-- Icon with custom string size -->
    <Icon name="twitter" folder="social" size="2em" class="ml-2" />
  </div>
</template>

<script setup>
// No need to import the Icon component if registered globally via the plugin
</script>
```

## Props

The `<Icon>` component accepts the following props:

| Prop     | Type               | Required | Default | Description                                                                                              |
| -------- | ------------------ | -------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `name`   | `String`           | Yes      |         | The filename of the SVG icon (without the `.svg` extension).                                             |
| `folder` | `String`           | No       | `''`    | Optional subfolder path within the base icon directory.                                                  |
| `size`   | `String`, `Number` | No       | `24`    | Size of the icon. A number assumes pixels (e.g., `24`), a string allows units (e.g., `'2em'`, `'32px'`). |
| `class`  | `String`           | No       | `''`    | Additional CSS classes to apply to the icon (e.g., for Tailwind).                                        |

## Full Example

Here's a more complete example combining setup and usage.

**`main.js` (or `main.ts`)**

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import IconPlugin from 'vue-icon-package' // Assuming 'vue-icon-package' is your built package name

const app = createApp(App)

app.use(IconPlugin, {
  // Optional: Define base path relative to the resolver's root
  // basePath: 'assets/icons/', // Adjust if your resolver needs it

  // Custom resolver function (Vite example)
  resolver: async (iconPath) => {
    try {
      // Assumes icons are in /src/assets/svg/ relative to project root
      // The iconPath will be like 'common/user' or 'alert-triangle'
      const modules = import.meta.glob('/src/assets/svg/**/*.svg', {
        as: 'component',
      })
      const path = `/src/assets/svg/${iconPath}.svg` // Construct the full path

      if (modules[path]) {
        const module = await modules[path]()
        return module.default // Often the component is the default export
      }
      console.warn(`Icon component not found for path: ${path}`)
      return null
    } catch (error) {
      console.error(`Failed to load icon: ${iconPath}`, error)
      return null
    }
  },
})

app.mount('#app')
```

**`src/App.vue`**

```vue
<template>
  <h1>My App with Icons</h1>
  <Icon name="alert-triangle" size="48" class="text-red-600" />
  <Icon name="user" folder="common" size="1.5em" class="text-gray-700 ml-4" />
</template>

<script setup>
// Icon is globally available, no import needed here
</script>
```

Remember to adjust the `resolver` function based on your project structure and build tool configuration.
│ │ │ └── twitter.svg
│ │ └── home.svg

````

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
````

## Props

| Prop     | Type          | Default    | Description                                                   |
| -------- | ------------- | ---------- | ------------------------------------------------------------- |
| `name`   | String        | (required) | The filename of the SVG icon (without extension)              |
| `folder` | String        | `''`       | Optional subfolder within the icons directory                 |
| `size`   | String/Number | `24`       | Size of the icon (number for pixels, string for custom units) |
| `class`  | String        | `''`       | Additional CSS classes (e.g. Tailwind classes)                |

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
  },
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
    },
  })
})
```

## License

MIT
