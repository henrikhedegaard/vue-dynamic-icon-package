<script setup lang="ts">
// Icon component is globally registered, no import needed here
</script>

<template>
  <main>
    <h1>Vue Icon Package Demo</h1>
    <p>Displaying SVG icons from src/assets/svg</p>

    <div class="icon-container">
      <div class="icon-item">
        <Icon name="alert-triangle" size="48" />
        <p>alert-triangle</p>
      </div>

      <div class="icon-item">
        <Icon name="announcement-03" size="48" />
        <p>announcement-03</p>
      </div>

      <div class="icon-item">
        <Icon name="bell-01" size="48" />
        <p>bell-01</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-item p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
