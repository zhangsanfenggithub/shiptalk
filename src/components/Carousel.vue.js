import { ref, onMounted, onUnmounted } from 'vue';
const images = [
    new URL('/@/assets/images/ship1.jpg', import.meta.url).href,
    new URL('/@/assets/images/ship2.jpg', import.meta.url).href,
    new URL('/@/assets/images/tech1.jpg', import.meta.url).href,
];
const activeIndex = ref(0);
let timer;
function setActive(idx) {
    activeIndex.value = idx;
}
onMounted(() => {
    timer = window.setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % images.length;
    }, 3000);
});
onUnmounted(() => {
    if (timer)
        clearInterval(timer);
});
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
;
;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "carousel-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "carousel-slide" },
});
for (const [img, idx] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        key: (img),
        src: (img),
        alt: ('轮播' + idx),
        ...{ class: ({ active: idx === __VLS_ctx.activeIndex }) },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "carousel-dots" },
});
for (const [img, idx] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setActive(idx);
            } },
        key: ('dot' + idx),
        ...{ class: "dot" },
        ...{ class: ({ active: idx === __VLS_ctx.activeIndex }) },
    });
}
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
            images: images,
            activeIndex: activeIndex,
            setActive: setActive,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
