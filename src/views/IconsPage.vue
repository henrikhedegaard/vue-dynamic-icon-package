<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-6">dt-project-icons</h1>

    <!-- Search bar -->
    <div class="mb-6">
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search icons"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Icons grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="(icon, name) in filteredIcons"
        :key="name"
        class="flex flex-col items-center p-4 border rounded-md hover:shadow-md transition-shadow"
      >
        <div class="h-24 w-24 flex items-center justify-center border rounded-md mb-2">
          <component :is="icon" class="h-8 w-8" />
        </div>
        <span class="text-sm text-center text-gray-700">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as icons from 'dt-project-icons'
import type { Component } from 'vue'

const searchQuery = ref('')

const allIcons: Record<string, Component> = icons

const filteredIcons = computed(() => {
  if (!searchQuery.value) return allIcons

  const query = searchQuery.value.toLowerCase()
  return Object.entries(allIcons).reduce<Record<string, Component>>((filtered, [name, icon]) => {
    if (name.toLowerCase().includes(query)) {
      filtered[name] = icon
    }
    return filtered
  }, {})
})

const clearSearch = () => {
  searchQuery.value = ''
}
</script>
