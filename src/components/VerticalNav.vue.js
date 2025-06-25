const emit = defineEmits(['newConversation']);
const startNewConversation = () => {
    emit('newConversation');
};
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "vertical-nav" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/@/assets/images/校徽.png",
    alt: "校徽",
    ...{ class: "nav-logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "nav-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.startNewConversation) },
    ...{ class: "square-button" },
});
;
;
;
;
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
            startNewConversation: startNewConversation,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $emit: emit,
        };
    },
});
;
