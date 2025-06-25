<template>
  <!-- <div class="navi-gem-container"> -->
    <div class="flex flex-col navi-gem-container">
    <HeaderNav />
    <MainNav />
    <Carousel />
    <h2 class="section-title">AI智能体集群</h2>
    <AiCardList />
    <Announcement />
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '/@/components/HeaderNav.vue';
import MainNav from '/@/components/MainNav.vue';
import Carousel from '/@/components/Carousel.vue';
import AiCardList from '/@/components/AiCardList.vue';
import Announcement from '/@/components/Announcement.vue';
</script>

<style scoped>
.navi-gem-container {
  background: linear-gradient(to bottom, #0a2e5a, #1a4877);
  width: 100%;
  min-height: 100%;
  color: white;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #ffffffee;
  margin: 30px 0 20px 0;
  font-family: 'Arial', sans-serif;
}


</style>