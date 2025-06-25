<template>
  <div class="header">
    <div class="logo-container">
      <img src="/@/assets/images/校徽.png" alt="校徽" />
    </div>
    <div class="title">
      <span class="brand-name">ShipTalk船说</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需逻辑
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ccc;
}
.logo-container {
  width: 80px;
  height: auto;
}
.logo-container img {
  width: 100%;
  height: auto;
}
.title {
  margin-left: 10px;
}
.brand-name {
  font-size: 24px;
  font-weight: bold;
  color: #1d4c7d;
  font-family: 'Arial', sans-serif;
}
</style>
