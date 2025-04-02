<script setup lang="ts">
// Icon component is globally registered, no import needed here
import { ref, onMounted, getCurrentInstance } from 'vue'

// Define our icon categories and icons
interface IconCategory {
  name: string
  icons: string[]
}

// Initialize with empty array, will be populated in onMounted
const categories = ref<IconCategory[]>([])
const isLoading = ref(true)
const error = ref('')

// Get access to app instance to use global properties
const app = getCurrentInstance()

// Load icon categories dynamically when component mounts
onMounted(() => {
  if (app?.appContext.config.globalProperties.$getIconCategories) {
    try {
      // Call the global method to get all icon categories
      categories.value =
        app.appContext.config.globalProperties.$getIconCategories()
      console.log('Loaded icon categories:', categories.value)

      // Check if we found any icons
      if (categories.value.length === 0) {
        error.value = 'No icon categories found'
      } else {
        // Check if any category has icons
        const hasIcons = categories.value.some(
          (category) => category.icons.length > 0
        )
        if (!hasIcons) {
          error.value = 'No icons found in any category'
        }
      }
    } catch (e) {
      console.error('Error loading icons:', e)
      error.value = 'Error loading icons'
    } finally {
      isLoading.value = false
    }
  } else {
    console.error('Icon discovery method not available')
    error.value = 'Icon discovery method not available'
    isLoading.value = false
  }
})
</script>

<template>
  <main>
    <h1>Vue Icon Package Demo</h1>
    <p>Displaying SVG icons from src/assets/svg</p>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-state">
      <p>Loading icons...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <p>Make sure you have SVG files in the src/assets/svg directory.</p>
    </div>

    <!-- Icons by category -->
    <div v-else>
      <div
        v-for="category in categories"
        :key="category.name"
        class="category-section"
      >
        <h2>{{ category.name }} Icons</h2>
        <div v-if="category.icons.length === 0" class="empty-category">
          <p>No icons found in this category</p>
        </div>
        <div v-else class="icon-container">
          <div
            v-for="iconName in category.icons"
            :key="iconName"
            class="icon-item"
          >
            <Icon
              :name="iconName"
              :folder="category.name === 'Root' ? '' : category.name"
            />
            <p>{{ iconName }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.category-section {
  margin-bottom: 3rem;
}

.category-section:not(:first-of-type) {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.icon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 240px; /* Fixed width for consistent layout */
}

.icon-item p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  word-break: break-word; /* Handle long icon names */
  max-width: 100%;
}

.loading-state,
.error-state,
.empty-category {
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 2rem 0;
}

.loading-state p {
  font-size: 1.125rem;
  color: #666;
}

.error-state p {
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.error-state p:last-child {
  color: #666;
  font-size: 0.875rem;
}

.empty-category p {
  color: #666;
  font-style: italic;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
