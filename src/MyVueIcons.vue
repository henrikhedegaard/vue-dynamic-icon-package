<template>
  <component :is="icon" v-bind="$attrs" :width="size" :height="size" />
</template>

<script>
import {
  Activity,
  Alert,
  AlignCenter,
  AlignJustify,
  AlignRight,
  Attachment01,
  Attachment02,
  ArrowLeft,
  ArrowLeftNarrow,
  ArrowRight,
  ArrowRightNarrow,
  ArrowUp,
  ArrowUpNarrow,
} from './index.js'

export default {
  name: 'MyVueIcons',
  components: {
    Activity,
    Alert,
    AlignCenter,
    AlignJustify,
    AlignRight,
    Attachment01,
    Attachment02,
    ArrowLeft,
    ArrowLeftNarrow,
    ArrowRight,
    ArrowRightNarrow,
    ArrowUp,
    ArrowUpNarrow,
  },
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          'Activity',
          'Alert',
          'AlignCenter',
          'AlignJustify',
          'AlignRight',
          'Attachment01',
          'Attachment02',
          'ArrowLeft',
          'ArrowLeftNarrow',
          'ArrowRight',
          'ArrowRightNarrow',
          'ArrowUp',
          'ArrowUpNarrow',
        ].includes(value) // Add more icons here
      },
    },
    size: {
      type: [String, Number],
      default: 24,
    },
  },
}
</script>
