import { SendOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { inject, ref, watch, nextTick, onMounted } from "vue";
import { useCozeAPI } from "../services/cozePatService";
import { QuestionList } from "./chat_data";
const { streamingChat, uploadFile, getBotInfo, botInfo, uploading } = useCozeAPI();
const messages = inject("messages");
const agentType = inject("agentType");
const addMessage = inject("addMessage");
const input = ref("");
const isLoading = ref(false);
const messageContainer = ref(null);
const presetquestions = ref([]);
const conversationId = ref(undefined);
const getLastBotMessage = () => {
    if (!messages?.value)
        return null;
    for (let i = messages.value.length - 1; i >= 0; i--) {
        if (messages.value[i].type === 'bot') {
            return messages.value[i];
        }
    }
    return null;
};
onMounted(async () => {
    if (agentType?.value) {
        await getBotInfo(agentType.value);
        console.log('机器人信息:', botInfo.value);
        const userMessage = {
            text: botInfo.value?.onboarding_info?.prologue || '',
            type: "bot",
            suggested_questions: botInfo.value?.onboarding_info?.suggested_questions || null,
            timestamp: new Date().getTime(),
        };
        addMessage?.(userMessage);
    }
});
const handlePresetQuestion = (question) => {
    input.value = question;
    send();
};
const scrollToBottom = () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};
watch(() => messages?.value?.length, () => {
    nextTick(() => {
        scrollToBottom();
    });
}, { deep: true });
watch(() => agentType?.value, (newType) => {
    if (newType) {
        presetquestions.value = QuestionList[newType];
    }
}, { immediate: true });
const formatTime = (timestamp) => {
    if (!timestamp)
        return "";
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};
const send = async () => {
    if (!input.value.trim() || isLoading.value)
        return;
    const userMessage = {
        text: input.value,
        type: "user",
        timestamp: new Date().getTime(),
    };
    addMessage?.(userMessage);
    isLoading.value = true;
    try {
        await streamingChat({
            query: input.value,
            conversationId: conversationId.value,
            onUpdate: (delta) => {
                console.log("onUpdate", delta);
                const lastBotMessage = getLastBotMessage();
                if (lastBotMessage) {
                    lastBotMessage.text = delta;
                    if (messages?.value) {
                        messages.value = [...messages.value];
                    }
                }
            },
            onSuccess: (delta) => {
                console.log("onSuccess", delta);
                const lastBotMessage = getLastBotMessage();
                if (lastBotMessage) {
                    lastBotMessage.text = delta;
                    if (messages?.value) {
                        messages.value = [...messages.value];
                    }
                }
            },
            onCreated: (data) => {
                conversationId.value = data.conversation_id;
                messages?.value?.push({
                    text: "正在思考中...",
                    type: "bot",
                    timestamp: new Date().getTime(),
                });
            },
        });
    }
    catch (error) {
        console.error("调用 Coze API 失败:", error);
        addMessage?.({
            text: "抱歉，请求出错，请稍后再试。",
            type: "bot",
            timestamp: new Date().getTime(),
        });
    }
    finally {
        isLoading.value = false;
        input.value = "";
    }
};
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "message-container",
    ref: "messageContainer",
});
;
for (const [msg, idx] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (idx),
        ...{ class: "message-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (msg.type === 'user' ? 'user-message' : 'bot-message') },
        ...{ class: "message" },
    });
    (msg.text);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "message-time" },
    });
    (__VLS_ctx.formatTime(msg.timestamp));
    if (msg.type === 'bot' && msg.suggested_questions && msg.suggested_questions.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "suggested-questions" },
        });
        for (const [question, qIdx] of __VLS_getVForSourceType((msg.suggested_questions))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(msg.type === 'bot' && msg.suggested_questions && msg.suggested_questions.length > 0))
                            return;
                        __VLS_ctx.handlePresetQuestion(question);
                    } },
                key: (qIdx),
                ...{ class: "suggested-question" },
            });
            const __VLS_0 = {}.SearchOutlined;
            ;
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
            const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
            (question);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-area" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onKeyup: (__VLS_ctx.send) },
    ...{ class: "user-input" },
    value: (__VLS_ctx.input),
    type: "text",
    placeholder: "输入你的问题...",
    disabled: (__VLS_ctx.isLoading),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.send) },
    ...{ class: "button" },
    disabled: (__VLS_ctx.isLoading),
});
const __VLS_4 = {}.SendOutlined;
;
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
(__VLS_ctx.isLoading ? "思考中..." : "发送");
;
;
;
;
;
;
;
;
;
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SendOutlined: SendOutlined,
            SearchOutlined: SearchOutlined,
            messages: messages,
            input: input,
            isLoading: isLoading,
            messageContainer: messageContainer,
            handlePresetQuestion: handlePresetQuestion,
            formatTime: formatTime,
            send: send,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
