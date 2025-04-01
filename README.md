How to use in projects:

1.

<template>
  <div>
    <!-- Basic usage -->
    <Icon name="user-01" category="Users" />

    <!-- With custom size -->
    <Icon name="cloud-01" category="weather" :size="32" />

  </div>
</template>

<script>
import { Icon } from 'dt-project-icons';

export default {
  components: {
    Icon
  }
}
</script>

or 2:
main.js:
import { createApp } from 'vue';
import App from './App.vue';
import IconPlugin from 'dt-project-icons';

const app = createApp(App);
app.use(IconPlugin);
app.mount('#app');

in any component:
<template>
<Icon name="user-01" category="Users" />
</template>
