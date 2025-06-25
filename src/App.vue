<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <router-view class="app-container" />
</template>

<style>
/* 移除重复的body样式，使用style.css中的全局样式 */
.app-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #ffffffee;
  margin: 30px 0 20px 0;
  font-family: 'Arial', sans-serif;
}
/* 其它全局样式... */
</style>
