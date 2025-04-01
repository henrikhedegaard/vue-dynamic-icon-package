<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-html="svgContent"
  ></svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: '100%',
    },
    category: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      svgContent: '',
    }
  },
  watch: {
    name: {
      immediate: true,
      handler: 'loadSvg',
    },
    category: {
      handler: 'loadSvg',
    },
  },
  methods: {
    async loadSvg() {
      try {
        let path = this.category
          ? `./svg/${this.category}/${this.name}.svg`
          : `./svg/${this.name}.svg`

        // Dynamic import of the SVG file
        const response = await fetch(path)
        if (!response.ok) throw new Error(`Failed to load SVG: ${path}`)

        const svgText = await response.text()

        // Extract the SVG content (everything inside the <svg> tags)
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
        const svgElement = svgDoc.querySelector('svg')

        // Extract only the inner content (paths, circles, etc.)
        this.svgContent = svgElement.innerHTML
      } catch (error) {
        console.error('Error loading SVG:', error)
        this.svgContent = ''
      }
    },
  },
}
</script>
