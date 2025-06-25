<template>
  <div class="course-page">
    <ContestHeader title="精品课程" />
    <!-- 筛选区域 -->
    <div class="main-content">
      <div class="filter-section">
        <h3 class="course-type-title">选择课程类型</h3>
        
        <!-- 标签化筛选区域 -->
        <div class="tag-container">
          <div
            v-for="type in courseTypes"
            :key="type"
            class="tag"
            :class="{ 'tag-selected': selectedTypes.includes(type) }"
            @click="toggleType(type)"
          >
            {{ type }}
          </div>
        </div>
      </div>
      <!-- 课程列表 -->
      <div class="course-list">
        <div v-for="course in filteredCourses" :key="course.id" class="course-card">
          <img :src="course.image" :alt="course.title" class="course-image" />
          <div class="course-info">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description }}</p>
            <div class="course-meta">
              <span>类别: {{ course.type }}</span>
              <span>时长: {{ course.duration }}小时</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ContestHeader from '../components/ContestHeader.vue';

interface Course {
  id: number
  title: string
  description: string
  type: string
  duration: number
  image: string
}

const courseTypes = ['自动化', '高等数学', '物理', '数据分析', '人工智能']
const selectedTypes = ref<string[]>([])
const courses = ref<Course[]>([
  { id: 1, title: '自动化控制基础', type: '自动化', description: '学习自动化系统的基本原理与控制方法', image: '/src/assets/images/tech1.jpg', duration: 10 },
  { id: 2, title: 'PLC编程技术', type: '自动化', description: '掌握可编程逻辑控制器的编程与应用', image: '/src/assets/images/tech1.jpg', duration: 8 },
  { id: 3, title: '微积分（上）', type: '高等数学', description: '高等数学基础课程，涵盖极限、导数与积分', image: '/src/assets/images/tech1.jpg',duration: 11},
  { id: 4, title: '线性代数', type: '高等数学', description: '矩阵理论与线性方程组求解方法', image: '/src/assets/images/tech1.jpg', duration:10 },
  { id: 5, title: '大学物理（力学）', type: '物理', description: '经典力学基本原理与应用', image: '/src/assets/images/tech1.jpg', duration: 28 },
  { id: 6, title: '电磁学基础', type: '物理', description: '电场与磁场的基本理论', image: '/src/assets/images/tech1.jpg', duration: 32 },
  { id: 7, title: 'Python数据分析', type: '数据分析', description: '使用Python进行数据处理与可视化', image: '/src/assets/images/tech1.jpg', duration: 22 },
  { id: 8, title: '机器学习实战', type: '数据分析', description: '基于真实数据集的机器学习算法应用', image: '/src/assets/images/tech1.jpg', duration: 22 },
  { id: 9, title: '神经网络入门', type: '人工智能', description: '深度学习基础与神经网络原理', image: '/src/assets/images/tech1.jpg', duration: 32 },
  { id: 10, title: '自然语言处理', type: '人工智能', description: '文本分析与语言模型应用', image: '/src/assets/images/tech1.jpg', duration: 28 }
]);

// 计算属性过滤课程
const filteredCourses = computed(() => {
  if (selectedTypes.value.length === 0) return courses.value
  return courses.value.filter(course => selectedTypes.value.includes(course.type))
})

// 切换标签选中状态的方法
const toggleType = (type: string) => {
  const index = selectedTypes.value.indexOf(type)
  if (index === -1) {
    selectedTypes.value.push(type)
  } else {
    selectedTypes.value.splice(index, 1)
  }
}
</script>

<style scoped>
.course-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40px;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding: 0 20px;
}

.filter-section {
  flex: 0 0 250px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.course-type-title {
  margin-bottom: 16px; /* 添加底部外边距，可根据需求调整数值 */
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.course-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.checkbox-label {
  display: inline-block;
  margin-right: 15px;
  font-size: 16px;
}

.course-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.course-info {
  padding: 15px;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
}
</style>
