<template>
  <!-- This component is deprecated, use Icon instead -->
  <Icon :name="icon" :size="size" v-bind="$attrs" />
</template>

<script>
import { Icon } from './index.js'

export default {
  name: 'MyVueIcons',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
  },
}
</script>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.warn('MyVueIcons is deprecated. Please use the Icon component instead.')
})
</script>
