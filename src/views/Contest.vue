<template>
  <div class="contest-page">
    <ContestHeader title="竞赛资讯"/>

    <div class="contest-container">
      <!-- 左侧竞赛列表 -->
      <div class="contest-list">
        <div v-for="contest in contests" :key="contest.id" class="contest-item"
             :class="{ 'active': selectedContest?.id === contest.id }" @click="selectContest(contest)">
          <div class="contest-item-content">
            <span class="category-tag">{{ contest.category }}</span>
            <h3 class="item-title">{{ contest.title }}</h3>
          </div>
        </div>
      </div>

      <!-- 右侧竞赛详情 -->
      <div class="contest-detail" v-if="selectedContest">
        <div class="detail-image">
          <img :src="selectedContest.image" :alt="selectedContest.title"/>
        </div>
        <div class="detail-content">
          <h2 class="detail-title">{{ selectedContest.title }}</h2>
          <div class="detail-meta">
            <span class="detail-date">发布日期：{{ selectedContest.date }}</span>
            <span class="detail-views">
                            <i class="fas fa-eye"></i> {{ selectedContest.views }}
                        </span>
          </div>
          <div class="detail-description">
            <h3>竞赛简介</h3>
            <p>{{ selectedContest.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, ref, onMounted} from 'vue'
import ContestHeader from '../components/ContestHeader.vue'

interface Contest {
  id: number
  title: string
  description: string
  category: string
  date: string
  views: number
  image: string
}

const contests = ref<Contest[]>([
  {
    id: 1,
    title: '中国轻纺城东进杯"第十七届中国高校纺织服装设计大赛',
    description: '为打造高水平中国纺织品设计开发教学与学术交流平台，提升中国纺织品设计与新产品开发教学水平，赋能应用型人才培养，发掘和推荐优秀纺织品创意设计与开发人才，助推中国纺织产业QUALITY_ASSURANCE.jpg高质量。',
    category: '设计创意',
    date: '2025-06-19',
    views: 29915,
    image: '/src/assets/images/tech1.jpg'
  },
  {
    id: 2,
    title: '第九届中国纺织服装高校大学生创意创新创业大赛',
    description: '为贯彻落实《国务院办公厅关于进一步支持大学生创新创业的指导意见》（国办发〔2021〕35号）激发高校学生创新创业热情，更好地整合纺织服装行业创业服务机构、创业园区、创投资本等各类资源。',
    category: '商业创业',
    date: '2025-06-19',
    views: 18806,
    image: '/src/assets/images/ship1.jpg'
  },
  {
    id: 3,
    title: '第三届全球运动装备创新设计大赛',
    description: '全球运动装备创新设计大赛（GSDA），聚焦运动时尚领域，融通艺术与科技创新之道，依循运动哲学之本，溯因未来运动时尚潮流之宗。',
    category: '设计创意',
    date: '2025-06-17',
    views: 30000,
    image: '/src/assets/images/ship2.jpg'
  },
  {
    id: 4,
    title: '2025年(第三届)四川省大学生民族工艺美术创意设计大赛',
    description: '2025年（第三届）四川省大学生民族工艺美术创意设计大赛，以习近平新时代中国特色社会主义思想为指导，全面贯彻落实widet大赛精神、widet大赛精神。',
    category: '设计创意',
    date: '2025-06-17',
    views: 19710,
    image: '/src/assets/images/tech1.jpg'
  }
])

const selectedContest = ref<Contest | null>(null)

const selectContest = (contest: Contest) => {
  selectedContest.value = contest
}

// 组件挂载时默认选中第一个赛事
onMounted(() => {
  if (contests.value.length > 0) {
    selectedContest.value = contests.value[0]
  }
})
</script>

<style scoped>
.contest-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.contest-container {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.contest-list {
  flex: 0 0 400px;
  overflow-y: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.contest-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}

.contest-item:hover {
  background: #f5f7fa;
}

.contest-item.active {
  background: #e6f7ff;
  border-right: 3px solid #1890ff;
}

.contest-item-content {
  position: relative;
  width: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-tag {
  position: relative;
  background: #e74c3c;
  color: white;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.item-title {
  font-size: 16px;
  margin: 0;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  max-height: 3em;
}

.contest-detail {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
}

.detail-image {
  height: 300px;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-content {
  padding: 20px;
}

.detail-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.detail-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}

.detail-description {
  margin: 20px 0;
}

.detail-description h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.detail-description p {
  line-height: 1.8;
  color: #666;
}

.share-btn {
  padding: 10px 25px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  color: #666;
}

.share-btn:hover {
  background: #e8e8e8;
}

.empty-detail {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-message {
  text-align: center;
  color: #999;
}

.empty-message i {
  font-size: 40px;
  margin-bottom: 15px;
}

.contest-views {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
