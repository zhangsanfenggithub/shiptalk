<template>
  <div class="vertical-nav">
    <div class="nav-header">
      <img src="/@/assets/images/校徽.png" alt="校徽" class="nav-logo" />
      <h2 class="nav-title">ShipTalk船说</h2>
    </div>
    <button class="square-button" @click="startNewConversation">新增对话</button>
  </div>
</template>
<script setup>
const emit = defineEmits(['newConversation'])

const startNewConversation = () => {
  emit('newConversation')
}
</script>
<style scoped>
/* 竖导航栏样式 */
.vertical-nav {
  width: 180px;
  height: 100%;
  background: #f9faff;
  border: 1px solid #ccc;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

/* 导航栏标题容器 */
.nav-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

/* 校徽图片样式 */
.nav-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* 新增对话方形按钮 */
.square-button {
  background: #86afdb;
  color: white;
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 40px;
}

.square-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  background: #0056b3;
}

.nav-title {
  font-size: 16px;
  font-weight: bold;
  color: #0056b3;
}
</style>
