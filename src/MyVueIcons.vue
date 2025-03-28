<template>
  <component :is="icon" v-bind="$attrs" :width="size" :height="size" />
</template>

<script>
import { MyIconA, MyIconB } from './index.js'

export default {
  name: 'MyVueIcons',
  components: {
    MyIconA,
    MyIconB,
  },
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value) => {
        return ['MyIconA', 'MyIconB'].includes(value) // Add more icons here
      },
    },
    size: {
      type: [String, Number],
      default: 24,
    },
  },
}
</script>
