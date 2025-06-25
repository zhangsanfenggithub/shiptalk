<template>
  <div class="ai-card" :style="{ backgroundImage: `url(${bg})` }" @click="handleClick">
    <h3>{{ title }}</h3>
    <p v-html="desc"></p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  title: string;
  desc: string;
  bg: string;
  agentType: string;
}>();

const handleClick = () => {
  router.push({
    path: '/chat',
    query: { type: props.agentType }
  })
}
</script>

<style scoped>
/* 智能体卡片样式 */
.ai-card {
    min-height: 145px;
    color: white; /* 字体颜色为白色 */
    display: block;
    padding: 20px;
    border-radius: 15px;
    transition: transform 0.3s, text-decoration 0.3s;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    cursor: pointer; /* 添加鼠标指针样式 */
}

.ai-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.ai-card:hover {
    transform: translateY(-5px); /* 鼠标悬停时卡片微微上移 */
}

.ai-card h3 {
    position: relative;
    font-size: 24px;
    margin: 0 0 10px 0;
    color: white; /* 标题字体颜色为白色 */
    text-decoration: none; /* 去掉默认下划线 */
    transition: text-decoration 0.3s; /* 添加过渡效果 */
    text-align: left; /* 文本左对齐 */
}

.ai-card:hover h3 {
    text-decoration: underline; /* 添加下划线 */
    text-decoration-color: white; /* 下划线颜色为白色 */
}

.ai-card p {
    position: relative;
    font-size: 16px;
    color: white; /* 描述字体颜色为白色 */
    text-align: left; /* 文本左对齐 */
}
</style>

