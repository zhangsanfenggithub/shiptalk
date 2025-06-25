<template>
  <div class="chat-layout">
    <div class="header-container">
      <ChatHeader />
    </div>
    <div class="main-content">
      <div class="nav-section">
        <VerticalNav @newConversation="resetMessages" />
      </div>
      <div class="content-section">
        <div class="chat-container-wrapper">
          <div class="chat-container">
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import ChatHeader from '../components/ChatHeader.vue'
import VerticalNav from '../components/VerticalNav.vue'
import ChatContainer from '../components/ChatContainer.vue'
import InputArea from '../components/InputArea.vue'

const route = useRoute()
const agentType = ref(route.query.type || '通用')
const messages = ref([
  { text:  `欢迎${agentType.value}页面！`, type: 'bot', timestamp: new Date().getTime() }
])

function addMessage(msg) {
  messages.value.push(msg)
}

function resetMessages() {
  messages.value = [
    { text: `欢迎${agentType.value}页面！`, type: 'bot', timestamp: new Date().getTime() }
  ]
}

provide('messages', messages)
provide('addMessage', addMessage)
provide('agentType', agentType)
</script>

<style scoped>
.chat-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e6f0ff, #ffffff);
}

.header-container {
  width: 100%;
  z-index: 1;
}

.main-content {
  flex: 1;
  position: relative;
  margin-top: 10px;
  display: flex;
}

.nav-section {
  width: 180px;
  height: 100%;
}

.content-section {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-container-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-container {
  width: 60%;
  height: 80%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.input-container {
  padding: 24px;
  border-top: 1px solid #e8e8e8;
}

:global(body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #e6f0ff, #ffffff);
}
</style>

