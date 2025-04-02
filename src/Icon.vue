<template>
  <div class="icon-wrapper" :style="{ width: computedSize, height: computedSize }">
    <component
      v-if="dynamicComponent"
      :is="dynamicComponent"
      v-bind="$attrs"
      class="icon-svg"
      :class="customClass"
    />
    <div v-else class="icon-placeholder" style="width: 100%; height: 100%;">
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
      description: 'The filename of the SVG icon (without extension)'
    },
    folder: {
      type: String,
      default: '',
      description: 'Optional subfolder within the icons directory'
    },
    size: {
      type: [String, Number],
      default: 24,
      description: 'Size of the icon (number for pixels, string for custom units)'
    },
    class: {
      type: String,
      default: '',
      description: 'Additional CSS classes (e.g. Tailwind classes)'
    }
  },
  data() {
    return {
      dynamicComponent: null,
      error: null
    }
  },
  computed: {
    computedSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size
    },
    customClass() {
      return this.class ? this.class : ''
    },
    iconPath() {
      // Get the configured icon path from the plugin options
      const basePath = this.$iconOptions?.basePath || ''
      const folder = this.folder ? `${this.folder}/` : ''
      return `${basePath}${folder}${this.name}`
    }
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
    }
  },
  methods: {
    async loadIcon() {
      try {
        // Reset error state
        this.error = null
        
        // Get the configured loader function from plugin options
        const loader = this.$iconOptions?.loader
        
        if (!loader) {
          console.error('Icon loader not configured. Did you install the plugin correctly?')
          this.error = 'Icon loader not configured'
          this.dynamicComponent = null
          return
        }
        
        // Use the loader to load the icon
        this.dynamicComponent = await loader(this.iconPath)
      } catch (err) {
        console.warn(`Failed to load icon: ${this.iconPath}`, err)
        this.error = err.message
        this.dynamicComponent = null
      }
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 100%;
  height: 100%;
}

.icon-placeholder {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>
