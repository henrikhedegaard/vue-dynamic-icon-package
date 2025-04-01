import Icon from './Icon.vue'

// For backward compatibility, you can keep the individual icon imports
// or remove them if you're ready to fully migrate to the new approach

export { Icon }

// Export a default object for Vue plugin usage
export default {
  install(app) {
    app.component('Icon', Icon)
  },
}
