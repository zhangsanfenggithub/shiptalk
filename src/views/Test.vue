<template>
<div class="chat-container">
    <div class="chat-messages">
    <div v-for="message in messages" :key="message.id" :class="message.role">
        {{ message.content }}
    </div>
    <div v-if="loading">正在加载...</div>
    </div>
    
    <div class="input-area">
    <input v-model="query" placeholder="请输入消息" />
    <button @click="sendMessage">发送</button>
    <input type="file" @change="handleFileUpload" />
    <div v-if="uploading">文件上传中...</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCozeAPI } from '../services/cozePatService';

// 初始化 Coze API 服务
const { 
streamingChat, 
uploadFile, 
getBotInfo, 
botInfo, 
uploading 
} = useCozeAPI();

const messages = ref<{ id: string; role: 'user' | 'assistant'; content: string }[]>([]);
const query = ref('');
const conversationId = ref<string | undefined>(undefined);
const loading = ref(false);

// 获取机器人信息
onMounted(async () => {
// await getBotInfo();
console.log('机器人信息:', botInfo.value);
});

// 发送消息
const sendMessage = async () => {
if (!query.value.trim()) return;

// 添加用户消息到列表
const userMessage = {
    id: Date.now().toString(),
    role: 'user' as const,
    content: query.value,
};
messages.value.push(userMessage);

loading.value = true;
try {
    await streamingChat({
    query: query.value,
    conversationId: conversationId.value,
    onUpdate: (delta) => {
        // 实时更新机器人回复
        let botMessage = messages.value.find(m => m.role === 'assistant' && !m.content.endsWith('\n'));
        if (botMessage) {
        botMessage.content = delta;
        } else {
        botMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant' as const,
            content: delta,
        };
        messages.value.push(botMessage);
        }
    },
    onSuccess: (delta) => {
        // 回复完成
        const botMessage = messages.value.find(m => m.role === 'assistant' && m.id === (Date.now() + 1).toString());
        if (botMessage) {
        botMessage.content = delta;
        }
    },
    onCreated: (data) => {
        // 保存会话ID用于后续对话
        conversationId.value = data.conversation_id;
    },
    });
} finally {
    loading.value = false;
    query.value = '';
}
};

// 处理文件上传
const handleFileUpload = async (event: Event) => {
const target = event.target as HTMLInputElement;
if (target.files && target.files[0]) {
    try {
    await uploadFile(target.files[0]);
    alert('文件上传成功');
    } catch (error) {
    alert('文件上传失败: ' + (error as Error).message);
    }
    target.value = ''; // 清空文件输入
}
};
</script>

<style scoped>
.chat-container {
max-width: 800px;
margin: 0 auto;
padding: 20px;
}
.chat-messages {
height: 400px;
overflow-y: auto;
border: 1px solid #ccc;
border-radius: 4px;
padding: 10px;
margin-bottom: 20px;
}
.input-area {
display: flex;
gap: 10px;
}
.input-area input[type="text"] {
flex: 1;
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
}
.input-area button {
padding: 8px 16px;
background-color: #1890ff;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
}
.user {
text-align: right;
margin-bottom: 10px;
}
.assistant {
text-align: left;
margin-bottom: 10px;
}
</style>