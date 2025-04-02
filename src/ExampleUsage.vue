<template>
  <div class="example-container">
    <h2>Icon Package Example</h2>
    
    <div class="icon-grid">
      <!-- Basic usage -->
      <div class="icon-item">
        <Icon name="home" />
        <span>home</span>
      </div>
      
      <!-- With subfolder -->
      <div class="icon-item">
        <Icon name="user" folder="common" />
        <span>common/user</span>
      </div>
      
      <!-- With custom size -->
      <div class="icon-item">
        <Icon name="settings" folder="common" size="32" />
        <span>common/settings (32px)</span>
      </div>
      
      <!-- With custom class -->
      <div class="icon-item">
        <Icon name="facebook" folder="social" class="text-blue-500" />
        <span>social/facebook (blue)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleUsage'
}
</script>

<style scoped>
.example-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9fafb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.icon-item span {
  margin-top: 8px;
  font-size: 14px;
  color: #4b5563;
}

.text-blue-500 {
  color: #3b82f6;
}
</style>
