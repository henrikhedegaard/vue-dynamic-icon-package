<template>
  <div class="demo-container">
    <h1>Icon Package Demo</h1>
    
    <div class="demo-section">
      <h2>Basic Usage</h2>
      <pre>&lt;Icon name="user" /&gt;</pre>
      <div class="demo-result">
        <Icon name="user" />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>With Subfolder</h2>
      <pre>&lt;Icon name="facebook" folder="social" /&gt;</pre>
      <div class="demo-result">
        <Icon name="facebook" folder="social" />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>Custom Size</h2>
      <pre>&lt;Icon name="settings" size="32" /&gt;</pre>
      <div class="demo-result">
        <Icon name="settings" size="32" />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>With Tailwind Classes</h2>
      <pre>&lt;Icon name="check" class="text-green-500" /&gt;</pre>
      <div class="demo-result">
        <Icon name="check" class="text-green-500" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoComponent'
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #111827;
}

h2 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #374151;
}

.demo-section {
  margin-bottom: 32px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9fafb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

pre {
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 12px 16px;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.demo-result {
  padding: 16px;
  background-color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.text-green-500 {
  color: #10b981;
}
</style>
