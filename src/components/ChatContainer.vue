<template>
  <div class="flex flex-col" style="height: 100%; width: 100%">
    <div id="message-container" ref="messageContainer">
      <div v-for="(msg, idx) in messages" :key="idx" class="message-wrapper">
        <div
          :class="msg.type === 'user' ? 'user-message' : 'bot-message'"
          class="message"
        >
          {{ msg.text }}
          <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
        </div>
        <!-- 推荐问题按钮 -->
        <div 
          v-if="msg.type === 'bot' && msg.suggested_questions && msg.suggested_questions.length > 0"
          class="suggested-questions"
        >
          <div
            v-for="(question, qIdx) in msg.suggested_questions"
            :key="qIdx"
            class="suggested-question"
            @click="handlePresetQuestion(question)"
          >
            <SearchOutlined />
            {{ question }}
          </div>
        </div>
      </div>
      <!-- <div v-if="isLoading">正在加载...</div> -->
    </div>
    <div class="input-area">
      <input
        class="user-input"
        v-model="input"
        type="text"
        placeholder="输入你的问题..."
        @keyup.enter="send"
        :disabled="isLoading"
      />
      <!-- <input type="file" @change="handleFileUpload" />
      <div v-if="uploading">文件上传中...</div> -->
      <button class="button" @click="send" :disabled="isLoading">
        <SendOutlined />
        {{ isLoading ? "思考中..." : "发送" }}
      </button>
    </div>
<!--    <div class="preset-questions">-->
<!--      <div-->
<!--        v-for="(question, idx) in presetquestions"-->
<!--        :key="idx"-->
<!--        class="preset-question"-->
<!--        @click="handlePresetQuestion(question)"-->
<!--      >-->
<!--        <SearchOutlined />-->
<!--        {{ question }}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { SendOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { inject, Ref, ref, watch, nextTick, toRef, onMounted } from "vue";
import { useCozeAPI } from "../services/cozePatService";
import { QuestionList } from "./chat_data";

// 初始化 Coze API 服务
const {
  streamingChat,
  uploadFile,
  getBotInfo,
  botInfo,
  uploading
} = useCozeAPI();

// 定义消息类型
interface Message {
  text: string;
  type: 'user' | 'bot';
  suggested_questions?: string[] | null;
  timestamp: number;
}

// 原有 ChatContainer 逻辑
const messages = inject<Ref<Message[]>>("messages");
const agentType = inject<Ref<string>>("agentType");
const addMessage = inject<(message: Message) => void>("addMessage");
const input = ref("");
const isLoading = ref(false);
const messageContainer = ref<HTMLElement | null>(null);
const presetquestions = ref([]);
const conversationId = ref<string | undefined>(undefined);

// 获取最后一个bot类型的消息
const getLastBotMessage = (): Message | null => {
  if (!messages?.value) return null;
  for (let i = messages.value.length - 1; i >= 0; i--) {
    if (messages.value[i].type === 'bot') {
      return messages.value[i];
    }
  }
  return null;
};

// 获取机器人信息
onMounted(async () => {
  if (agentType?.value) {
    await getBotInfo(agentType.value);
    console.log('机器人信息:', botInfo.value);
    // 添加用户消息到消息列表
    const userMessage: Message = {
      text: botInfo.value?.onboarding_info?.prologue || '',
      type: "bot",
      suggested_questions: botInfo.value?.onboarding_info?.suggested_questions || null,
      timestamp: new Date().getTime(),
    };
    addMessage?.(userMessage);
  }
});

// 处理预置问题
const handlePresetQuestion = (question : string) => {
   // Set the input box value to the clicked question
  input.value = question;
  send();
};

// 滚动到底部
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// 监听消息变化
watch(
  () => messages?.value?.length,
  () => {
    nextTick(() => {
      scrollToBottom();
    });
  },
  { deep: true }
);

// 监听智能体类型变化
watch(
  () => agentType?.value,
  (newType) => {
    if (newType) {
      presetquestions.value = QuestionList[newType];
    }
  },
  { immediate: true }
);

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// 发送消息 - 合并后的实现
const send = async () => {
  if (!input.value.trim() || isLoading.value) return;

  // 添加用户消息到消息列表
  const userMessage: Message = {
    text: input.value,
    type: "user" as const,
    timestamp: new Date().getTime(),
  };
  addMessage?.(userMessage);

  isLoading.value = true;
  try {
    await streamingChat({
      query: input.value,
      conversationId: conversationId.value,
      onUpdate: (delta) => {
        console.log("onUpdate",delta);
        // 获取最后一个bot消息并拼接delta
        const lastBotMessage = getLastBotMessage();
        if (lastBotMessage) {
          lastBotMessage.text = delta;
          // 触发响应式更新
          if (messages?.value) {
            messages.value = [...messages.value];
          }
        }
      },
      onSuccess: (delta) => {
        console.log("onSuccess",delta);
        // 回复完成
        const lastBotMessage = getLastBotMessage();
        if (lastBotMessage) {
          lastBotMessage.text = delta;
          // 触发响应式更新
          if (messages?.value) {
            messages.value = [...messages.value];
          }
        }
      },
      onCreated: (data) => {
        // 保存会话ID用于后续对话
        conversationId.value = data.conversation_id;
        messages?.value?.push({
          text: "正在思考中...",
          type: "bot",
          timestamp: new Date().getTime(),
        })
      },
    });
  } catch (error) {
    console.error("调用 Coze API 失败:", error);
    addMessage?.({
      text: "抱歉，请求出错，请稍后再试。",
      type: "bot" as const,
      timestamp: new Date().getTime(),
    });
  } finally {
    isLoading.value = false;
    input.value = "";
  }
};

// // 处理文件上传
// const handleFileUpload = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files && target.files[0]) {
//     try {
//       await uploadFile(target.files[0]);
//       alert('文件上传成功');
//     } catch (error) {
//       alert('文件上传失败: ' + (error as Error).message);
//     }
//     target.value = ''; // 清空文件输入
//   }
// };
</script>

<style scoped>
#message-container {
  width: 100%;
  height: calc(100% - 120px);
  overflow-y: auto;
  padding: 20px;
  border: 1px solid rgba(77, 148, 206, 0.2);
  border-radius: 15px;
  background-color: #f9faff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  scroll-behavior: smooth;
}

/* 其余样式保持不变 */
#message-container::-webkit-scrollbar {
  width: 6px;
}

#message-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

#message-container::-webkit-scrollbar-thumb {
  background: rgba(0, 123, 255, 0.3);
  border-radius: 3px;
  transition: all 0.3s ease;
}

#message-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 123, 255, 0.5);
}

.message {
  margin: 10px 0;
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 80%;
  min-width: 50px;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  position: relative;
  transition: all 0.3s ease;
  padding-bottom: 25px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  background: #0091ff;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 12px rgba(0, 123, 255, 0.2);
  align-self: flex-end;
  position: relative;
  text-align: left;
}

.user-message::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  border-radius: inherit;
  pointer-events: none;
}

.user-message::before {
  content: "";
  position: absolute;
  bottom: -6px;
  right: 0;
  width: 20px;
  height: 20px;
  background: #0091ff;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

.bot-message {
  background: linear-gradient(135deg, #ffffff, #f5f7ff);
  color: #2c3e50;
  margin-right: auto;
  border-bottom-left-radius: 4px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: left;
}

.bot-message::before {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ffffff, #f5f7ff);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.message-time {
  position: absolute;
  bottom: 8px;
  font-size: 11px;
  opacity: 0.8;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

.user-message .message-time {
  right: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.bot-message .message-time {
  left: 12px;
  color: rgba(44, 62, 80, 0.5);
}

.input-area {
  margin-top: 20px;
  width: 100%;
  display: flex;
  gap: 12px;
  padding: 0 10px;
  height: 60px;
  min-height: 60px;
}

.user-input {
  flex: 1;
  padding: 14px 20px;
  border-radius: 25px;
  border: 2px solid #e6e9f5;
  font-size: 16px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.user-input:focus {
  outline: none;
  border-color: #0091ff;
  box-shadow: 0 0 0 3px rgba(0, 145, 255, 0.1);
  background-color: #ffffff;
}

.user-input::placeholder {
  color: #a0aec0;
}

.button {
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #0091ff, #0066ff);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
}

.button:hover {
  background: linear-gradient(135deg, #0066ff, #0052cc);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2);
}

/* 预置问题样式 */
.preset-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  padding: 0 10px;
  margin-top: 10px;
}

.preset-question {
  background: linear-gradient(135deg, #f0f4ff, #e6eaff);
  padding: 10px 16px;
  border-radius: 15px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.preset-question:hover {
  background: linear-gradient(135deg, #e6eaff, #dce3ff);
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.preset-question:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 消息包装器 */
.message-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

/* 推荐问题样式 */
.suggested-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  margin-left: 0;
  margin-right: auto;
  max-width: 80%;
}

.suggested-question {
  background: linear-gradient(135deg, #f8faff, #eef2ff);
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13px;
  color: #5a6c7d;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 145, 255, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 6px;
}

.suggested-question:hover {
  background: linear-gradient(135deg, #eef2ff, #e0e8ff);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 145, 255, 0.15);
  border-color: rgba(0, 145, 255, 0.2);
}

.suggested-question:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>