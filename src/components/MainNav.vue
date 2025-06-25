<template>
  <div class="main-nav">
    <ul>
      <li><a href="#intro">网页介绍</a></li>
      <li><a href="#overview">智能体概况</a></li>
      <li><router-link to="/contest">竞赛资讯</router-link></li>
      <li><router-link to="/courses">精品课程</router-link></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.main-nav {
  width: 100%;
  background-color: #2c6eb4;
  padding: 10px 0;
}
.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}
.main-nav ul li {
  flex: 1;
  text-align: center;
}
.main-nav ul li a,
.main-nav ul li router-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}
.main-nav ul li a:hover,
.main-nav ul li router-link:hover {
  text-decoration: underline;
}
</style>
