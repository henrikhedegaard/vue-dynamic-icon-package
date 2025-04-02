import { App, Component } from 'vue';
import Icon from './Icon.vue';

// Type for the function that resolves an icon path to a component
type IconResolver = (iconPath: string) => Promise<Component | null>;

// Options for the createIconLoader function
interface IconLoaderOptions {
  resolver: IconResolver;
}

// Options for the IconPlugin install method
interface IconPluginOptions {
  basePath?: string;
  resolver?: IconResolver;
}

/**
 * Create a Vue icon loader function
 * @param {Object} options Configuration options
 * @param {Function} options.resolver Function to resolve icon paths to components
 * @returns {Function} Icon loader function
 */
const createIconLoader = (options: IconLoaderOptions) => {
  return async (iconPath: string) => {
    try {
      return await options.resolver(iconPath)
    } catch (error) {
      console.warn(`Failed to resolve icon: ${iconPath}`, error)
      return null
    }
  }
}

/**
 * Vue plugin for icon system
 * @param {Object} options Configuration options
 * @param {string} options.basePath Base path to icon directory
 * @param {Function} options.resolver Function to resolve icon paths to components
 */
const IconPlugin = {
  install(app: App, options: IconPluginOptions = {}) {
    // Set default options
    const defaultOptions = {
      basePath: '',
      resolver: async (iconPath: string): Promise<Component | null> => {
        // Default resolver that tries to import .vue files
        // This should be overridden by the user with a resolver that works for their project
        try {
          return await import(`${iconPath}.vue`)
        } catch (error) {
          console.error(`Icon not found: ${iconPath}.vue`, error)
          return null
        }
      }
    }

    // Merge options
    const mergedOptions = { ...defaultOptions, ...options }
    
    // Create loader function
    const loader: IconResolver = createIconLoader(mergedOptions)
    
    // Provide options to components
    app.provide('iconOptions', {
      basePath: mergedOptions.basePath,
      loader
    })
    
    // Make options available via $iconOptions
    app.config.globalProperties.$iconOptions = {
      basePath: mergedOptions.basePath,
      loader
    }
    
    // Register the Icon component
    app.component('Icon', Icon)
  }
}

// Export the Icon component and plugin
export { Icon, IconPlugin }

// Only named exports are used
