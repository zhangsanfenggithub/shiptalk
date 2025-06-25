import { ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import ChatHeader from '../components/ChatHeader.vue';
import VerticalNav from '../components/VerticalNav.vue';
import ChatContainer from '../components/ChatContainer.vue';
import InputArea from '../components/InputArea.vue';
const route = useRoute();
const agentType = ref(route.query.type || '通用');
const messages = ref([
    { text: `欢迎${agentType.value}页面！`, type: 'bot', timestamp: new Date().getTime() }
]);
function addMessage(msg) {
    messages.value.push(msg);
}
function resetMessages() {
    messages.value = [
        { text: `欢迎${agentType.value}页面！`, type: 'bot', timestamp: new Date().getTime() }
    ];
}
provide('messages', messages);
provide('addMessage', addMessage);
provide('agentType', agentType);
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chat-layout" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-container" },
});
;
const __VLS_0 = __VLS_asFunctionalComponent(ChatHeader, new ChatHeader({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-section" },
});
;
const __VLS_3 = __VLS_asFunctionalComponent(VerticalNav, new VerticalNav({
    ...{ 'onNewConversation': {} },
}));
const __VLS_4 = __VLS_3({
    ...{ 'onNewConversation': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onNewConversation: (__VLS_ctx.resetMessages)
};
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chat-container-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chat-container" },
});
;
const __VLS_10 = __VLS_asFunctionalComponent(ChatContainer, new ChatContainer({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
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
            ChatHeader: ChatHeader,
            VerticalNav: VerticalNav,
            ChatContainer: ChatContainer,
            resetMessages: resetMessages,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
