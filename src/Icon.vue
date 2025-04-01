<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="svgContent"
  ></svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '24',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },
  data() {
    return {
      svgContent: ''
    }
  },
  
  watch: {
    name: {
      immediate: true,
      handler: 'loadSvg'
    },
    category: {
      handler: 'loadSvg'
    }
  },
  
  methods: {
    async loadSvg() {
      try {
        // Determine the path to the SVG file
        const svgName = this.name.endsWith('.svg') ? this.name : `${this.name}.svg`
        const path = this.category
          ? `./svg/${this.category}/${svgName}`
          : `./svg/${svgName}`

        // Try to fetch the SVG file
        const response = await fetch(path)
        if (!response.ok) throw new Error(`Failed to fetch SVG: ${path}`)
        
        const svgText = await response.text()
        this.processSvgContent(svgText)
      } catch (error) {
        console.warn(`Failed to load SVG: ${this.name}`, error)
        this.svgContent = ''
      }
    },
    
    processSvgContent(content) {
      try {
        // Parse the SVG content
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(content, 'image/svg+xml')
        const svgElement = svgDoc.querySelector('svg')
        
        if (svgElement) {
          // Extract only the inner content (paths, circles, etc.)
          this.svgContent = svgElement.innerHTML
        } else {
          // If we couldn't parse it as SVG, just use the content directly
          this.svgContent = content
        }
      } catch (error) {
        console.warn('Error processing SVG content:', error)
        this.svgContent = ''
      }
    }
  }
})
</script>
