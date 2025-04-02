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
  <div class="mx-auto max-w-7xl py-6">
    <header>
      <h1 class="text-2xl font-bold mb-2">Vue Icon Package Demo</h1>
      <p class="text-gray-600 mb-12">
        Displaying SVG icons from src/assets/svg
      </p>
      <div class="w-full h-full">asdasd</div>
      <div class="flex flex-row-reverse">
        <Icon
          name="arrow-down"
          folder="Arrows"
          size="64"
          class="text-red-700 bg-red-300"
        />
      </div>
    </header>
    <main>
      <!-- Loading state -->
      <div v-if="isLoading" class="p-8 text-center bg-gray-50 rounded-lg my-8">
        <p class="text-lg text-gray-600">Loading icons...</p>
      </div>
      <!-- Error state -->
      <div v-else-if="error" class="p-8 text-center bg-red-50 rounded-lg my-8">
        <p class="text-red-600 mb-2">{{ error }}</p>
        <p class="text-gray-600 text-sm">
          Make sure you have SVG files in the src/assets/svg directory.
        </p>
      </div>

      <!-- Icons by category -->

      <div
        v-else
        class="divide-y divide-stone-200 border border-stone-200 rounded-lg shadow-xs"
      >
        <div v-for="category in categories" :key="category.name" class="p-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-700 pt-0">
            {{ category.name }} Icons
          </h2>
          <div
            v-if="category.icons.length === 0"
            class="p-8 text-center bg-gray-50 rounded-lg my-4"
          >
            <p class="text-gray-500 italic">No icons found in this category</p>
          </div>
          <div
            v-else
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-8 mt-4 mb-0"
          >
            <div
              v-for="iconName in category.icons"
              :key="iconName"
              class="flex flex-col items-center size-32 text-center bg-stone-50/20 p-2 hover:bg-stone-50 group rounded-lg border transition-all duration-200 border-stone-200 justify-center"
            >
              <Icon
                :name="iconName"
                :folder="category.name === 'Root' ? '' : category.name"
                class="text-gray-700 hover:text-blue-500 transition-colors"
              />
              <p
                class="mt-2 text-sm text-gray-500 break-words max-w-full group-hover:text-stone-800 line-clamp-2 transition-all"
              >
                {{ iconName }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
