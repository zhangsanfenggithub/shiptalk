import { ref, onMounted } from 'vue';
import { useCozeAPI } from '../services/cozePatService';
const { streamingChat, uploadFile, getBotInfo, botInfo, uploading } = useCozeAPI();
const messages = ref([]);
const query = ref('');
const conversationId = ref(undefined);
const loading = ref(false);
onMounted(async () => {
    console.log('机器人信息:', botInfo.value);
});
const sendMessage = async () => {
    if (!query.value.trim())
        return;
    const userMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: query.value,
    };
    messages.value.push(userMessage);
    loading.value = true;
    try {
        await streamingChat({
            query: query.value,
            conversationId: conversationId.value,
            onUpdate: (delta) => {
                let botMessage = messages.value.find(m => m.role === 'assistant' && !m.content.endsWith('\n'));
                if (botMessage) {
                    botMessage.content = delta;
                }
                else {
                    botMessage = {
                        id: (Date.now() + 1).toString(),
                        role: 'assistant',
                        content: delta,
                    };
                    messages.value.push(botMessage);
                }
            },
            onSuccess: (delta) => {
                const botMessage = messages.value.find(m => m.role === 'assistant' && m.id === (Date.now() + 1).toString());
                if (botMessage) {
                    botMessage.content = delta;
                }
            },
            onCreated: (data) => {
                conversationId.value = data.conversation_id;
            },
        });
    }
    finally {
        loading.value = false;
        query.value = '';
    }
};
const handleFileUpload = async (event) => {
    const target = event.target;
    if (target.files && target.files[0]) {
        try {
            await uploadFile(target.files[0]);
            alert('文件上传成功');
        }
        catch (error) {
            alert('文件上传失败: ' + error.message);
        }
        target.value = '';
    }
};
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chat-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chat-messages" },
});
for (const [message] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (message.id),
        ...{ class: (message.role) },
    });
    (message.content);
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-area" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "请输入消息",
});
(__VLS_ctx.query);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.sendMessage) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleFileUpload) },
    type: "file",
});
if (__VLS_ctx.uploading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
;
;
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            uploading: uploading,
            messages: messages,
            query: query,
            loading: loading,
            sendMessage: sendMessage,
            handleFileUpload: handleFileUpload,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
