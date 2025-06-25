<template>
  <div class="chat-header">
    <router-link to="/" class="back-button">返回</router-link>
    <h1>{{ agentType }}</h1>
  </div>
</template>
<script setup>
import { inject } from 'vue'
const agentType = inject('agentType', '智能体')
</script>
<style scoped>
.chat-header {
  padding: 16px 24px;
  background-color: #f5f8ff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 32px;
  color: #0056b3;
  flex: 1;
  text-align: left;
  margin-left: 100px;
}

.back-button {
  text-decoration: none;
  color: #0056b3;
  font-size: 24px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease, transform 0.3s ease;
  position: absolute;
  left: 24px;
}

.back-button::before {
  content: '⮘';
  margin-right: 5px;
  font-size: 28px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.back-button:hover {
  color: #007bff;
  transform: scale(1.1);
}

.back-button:hover::before {
  color: #007bff;
  transform: scale(1.2);
}
</style>
