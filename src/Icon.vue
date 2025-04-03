<template>
  <div
    class="icon-wrapper"
    :style="{ width: computedSize, height: computedSize }"
  >
    <component
      v-if="dynamicComponent"
      :is="dynamicComponent"
      v-bind="$attrs"
      class="icon-svg"
      :class="[customClass, `[&>*]:size-${size}`]"
    />
    <div v-else class="icon-placeholder">
      <!-- Fallback when icon not found -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      description: 'The filename of the SVG icon (without extension)',
    },
    folder: {
      type: String,
      default: '',
      description: 'Optional subfolder within the icons directory',
    },
    size: {
      type: [String, Number],
      default: 24,
      description:
        'Size of the icon (number for pixels, string for custom units)',
    },
    class: {
      type: String,
      default: '',
      description: 'Additional CSS classes (e.g. Tailwind classes)',
    },
  },
  data() {
    return {
      dynamicComponent: null,
      error: null,
    }
  },
  computed: {
    computedSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size
    },
    customClass() {
      // Start with any custom classes provided
      let classes = this.class ? this.class : ''

      // If size is a valid number, add the Tailwind size class
      if (
        typeof this.size === 'number' ||
        (typeof this.size === 'string' && !isNaN(parseInt(this.size)))
      ) {
        const sizeValue =
          typeof this.size === 'number' ? this.size : parseInt(this.size)
        classes += classes ? ` size-${sizeValue}` : `size-${sizeValue}`
      }

      return classes
    },
    iconPath() {
      // Get the configured icon path from the plugin options
      const basePath = this.$iconOptions?.basePath || ''
      const folder = this.folder ? `${this.folder}/` : ''
      return `${basePath}${folder}${this.name}`
    },
  },
  async mounted() {
    await this.loadIcon()
  },
  watch: {
    name() {
      this.loadIcon()
    },
    folder() {
      this.loadIcon()
    },
  },
  methods: {
    async loadIcon() {
      try {
        // Reset error state
        this.error = null

        // Get the configured loader function from plugin options
        const loader = this.$iconOptions?.loader

        if (!loader) {
          console.error(
            'Icon loader not configured. Did you install the plugin correctly?'
          )
          this.error = 'Icon loader not configured'
          this.dynamicComponent = null
          return
        }

        // Use the loader to load the icon
        const component = await loader(this.iconPath)

        // Add w-full h-full classes to the SVG element
        if (component && component.render) {
          const originalRender = component.render
          component.render = function (h) {
            const vnode = originalRender.call(this, h)
            if (vnode && vnode.tag === 'svg') {
              // Add the w-full h-full classes to the SVG element
              if (!vnode.data) vnode.data = {}
              if (!vnode.data.class) vnode.data.class = ''
              vnode.data.class += ' w-full h-full'
            }
            return vnode
          }
        }

        this.dynamicComponent = component
      } catch (err) {
        console.warn(`Failed to load icon: ${this.iconPath}`, err)
        this.error = err.message
        this.dynamicComponent = null
      }
    },
  },
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* SVG element gets w-full h-full classes to ensure it fills its container */

.icon-placeholder {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>
