<template>
  <div class="carousel-container">
    <div class="carousel-slide">
      <img v-for="(img, idx) in images" :key="img" :src="img" :alt="'轮播'+idx" :class="{ active: idx === activeIndex }" />
    </div>
    <div class="carousel-dots">
      <span v-for="(img, idx) in images" :key="'dot'+idx" class="dot" :class="{ active: idx === activeIndex }" @click="setActive(idx)"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const images = [
  new URL('/@/assets/images/ship1.jpg', import.meta.url).href,
  new URL('/@/assets/images/ship2.jpg', import.meta.url).href,
  new URL('/@/assets/images/tech1.jpg', import.meta.url).href,
];
const activeIndex = ref(0);
let timer: number | undefined;
function setActive(idx: number) {
  activeIndex.value = idx;
}
onMounted(() => {
  timer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % images.length;
  }, 3000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* 轮播容器 */
.carousel-container {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 500px;
}

.carousel-slide img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-slide img.active {
  opacity: 1;
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background-color: white;
}

</style>



