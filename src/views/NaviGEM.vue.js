import HeaderNav from '/@/components/HeaderNav.vue';
import MainNav from '/@/components/MainNav.vue';
import Carousel from '/@/components/Carousel.vue';
import AiCardList from '/@/components/AiCardList.vue';
import Announcement from '/@/components/Announcement.vue';
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col navi-gem-container" },
});
;
const __VLS_0 = __VLS_asFunctionalComponent(HeaderNav, new HeaderNav({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
;
const __VLS_3 = __VLS_asFunctionalComponent(MainNav, new MainNav({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
;
const __VLS_6 = __VLS_asFunctionalComponent(Carousel, new Carousel({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title" },
});
;
const __VLS_9 = __VLS_asFunctionalComponent(AiCardList, new AiCardList({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
;
const __VLS_12 = __VLS_asFunctionalComponent(Announcement, new Announcement({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
;
;
;
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HeaderNav: HeaderNav,
            MainNav: MainNav,
            Carousel: Carousel,
            AiCardList: AiCardList,
            Announcement: Announcement,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
