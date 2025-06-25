<template>
  <div class="contest-header">
    <ArrowLeftOutlined></ArrowLeftOutlined>
    <router-link to="/" class="back-button">返回</router-link>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 定义props类型
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
});
</script>

<style scoped>
.contest-header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px; /* 修改内边距为指定值 */
  background-color: #f5f5f5; /* 修改背景色为指定值 */
  border-bottom: 2px solid #ccc; /* 修改边框为指定样式 */
  position: relative;
  /* 移除box-shadow以匹配简洁风格 */
}

.contest-header h1 {
  font-weight: bold;
  font-size: 32px;
  color: #0056b3;
  flex: 1;
  text-align: left;
  margin: 0 0 0 100px;
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
