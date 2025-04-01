# dt-project-icons

A Vue 3 icon library for Dive Travels projects, featuring a comprehensive collection of SVG icons organized by category.

## Installation

```bash
npm install dt-project-icons
# or
yarn add dt-project-icons
```

## Usage

This package provides a simple and flexible way to use icons in your Vue 3 application.

### Option 1: Import in Individual Components

```vue
<template>
  <div>
    <!-- Basic usage -->
    <Icon name="user-01" category="Users" />

    <!-- With custom size -->
    <Icon name="cloud-01" category="weather" :size="32" />

    <!-- With custom color -->
    <Icon name="activity" color="#FF0000" />
  </div>
</template>

<script>
import { Icon } from 'dt-project-icons'

export default {
  components: {
    Icon,
  },
}
</script>
```

### Option 2: Register Globally

In your main.js or main.ts file:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import IconPlugin from 'dt-project-icons'

const app = createApp(App)
app.use(IconPlugin) // This registers the Icon component globally
app.mount('#app')
```

Then in any component:

```vue
<template>
  <div>
    <Icon name="user-01" category="Users" />
    <Icon name="cloud-01" category="weather" size="32" color="#4A90E2" />
  </div>
</template>
```

## Available Props

| Prop     | Type          | Default        | Description                                    |
| -------- | ------------- | -------------- | ---------------------------------------------- |
| name     | String        | (required)     | The name of the icon (without .svg extension)  |
| category | String        | ''             | The category folder (e.g., 'Users', 'weather') |
| size     | String/Number | '24'           | Size of the icon in pixels or CSS units        |
| color    | String        | 'currentColor' | Color of the icon (CSS color)                  |

## Available Icons

### Users Category

- user-01
- user-02
- user-03
- user-check-01
- user-check-02
- user-circle
- user-down-01
- user-down-02
- user-edit
- user-left-01
- user-left-02
- user-minus-01
- user-minus-02
- user-plus-01
- user-plus-02
- user-right-01
- user-right-02
- user-square
- user-up-01
- user-up-02
- user-x-01
- user-x-02
- users-01
- users-02
- users-03
- users-check
- users-down
- users-edit
- users-left
- users-minus
- users-plus
- users-right
- users-up
- users-x
- face-content
- face-frown
- face-happy
- face-neutral
- face-sad
- face-smile
- face-wink

### Weather Category

- cloud-01
- cloud-02
- cloud-03
- cloud-lightning
- cloud-moon
- cloud-off
- cloud-raining-01
- cloud-raining-02
- cloud-raining-03
- cloud-snow
- cloud-sun-01
- cloud-sun-02
- cloud-sun-03
- (and more...)

### Other Icons

- activity
- alert
- align-center
- align-justify
- align-right
- arrow-down
- arrow-down-narrow
- arrow-left
- arrow-left-narrow
- arrow-right
- arrow-right-narrow
- arrow-up
- arrow-up-narrow
- attachment-01
- attachment-02
- backpack
- bar-chart-01
- bell
- bell-ring
- bold
- book
- box
- building-01
- calendar
- camera-01
- car-01
- check
- chevron-down
- chevron-down-double
- chevron-left
- chevron-left-double
- chevron-right
- chevron-right-double
- chevron-selector-vertical
- chevron-up
- chevron-up-double
- clock
- close
- close-circle
- close-square
- code-02
- coin-dollar
- compass-03
- copy-01
- document
- dollar-symbol
- download-01
- download-02
- envelope
- settings-01
- settings-02

## Examples

```vue
<!-- Basic usage -->
<Icon name="user-01" category="Users" />

<!-- Custom size -->
<Icon name="cloud-01" category="weather" size="48" />

<!-- Custom color -->
<Icon name="activity" color="red" />

<!-- Custom size and color -->
<Icon name="bell" size="32" color="#4A90E2" />

<!-- Using with other attributes -->
<Icon name="alert" class="my-icon-class" @click="handleClick" />
```

## Adding New Icons

One of the key features of this package is the ability to easily add new icons without having to create individual Vue components or update any code.

To add a new icon:

1. Simply place your SVG file in the `src/svg` directory
2. For categorized icons, place them in the appropriate subdirectory (e.g., `src/svg/Users/` or `src/svg/weather/`)
3. Use the icon immediately with the `Icon` component:

```vue
<!-- For an icon at src/svg/new-icon.svg -->
<Icon name="new-icon" />

<!-- For a categorized icon at src/svg/NewCategory/special-icon.svg -->
<Icon name="special-icon" category="NewCategory" />
```

That's it! No additional steps required.

## License

MIT
