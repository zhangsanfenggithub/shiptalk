import { ref, onMounted } from 'vue';
import ContestHeader from '../components/ContestHeader.vue';
const contests = ref([
    {
        id: 1,
        title: '中国轻纺城东进杯"第十七届中国高校纺织服装设计大赛',
        description: '为打造高水平中国纺织品设计开发教学与学术交流平台，提升中国纺织品设计与新产品开发教学水平，赋能应用型人才培养，发掘和推荐优秀纺织品创意设计与开发人才，助推中国纺织产业QUALITY_ASSURANCE.jpg高质量。',
        category: '设计创意',
        date: '2025-06-19',
        views: 29915,
        image: '/src/assets/images/tech1.jpg'
    },
    {
        id: 2,
        title: '第九届中国纺织服装高校大学生创意创新创业大赛',
        description: '为贯彻落实《国务院办公厅关于进一步支持大学生创新创业的指导意见》（国办发〔2021〕35号）激发高校学生创新创业热情，更好地整合纺织服装行业创业服务机构、创业园区、创投资本等各类资源。',
        category: '商业创业',
        date: '2025-06-19',
        views: 18806,
        image: '/src/assets/images/ship1.jpg'
    },
    {
        id: 3,
        title: '第三届全球运动装备创新设计大赛',
        description: '全球运动装备创新设计大赛（GSDA），聚焦运动时尚领域，融通艺术与科技创新之道，依循运动哲学之本，溯因未来运动时尚潮流之宗。',
        category: '设计创意',
        date: '2025-06-17',
        views: 30000,
        image: '/src/assets/images/ship2.jpg'
    },
    {
        id: 4,
        title: '2025年(第三届)四川省大学生民族工艺美术创意设计大赛',
        description: '2025年（第三届）四川省大学生民族工艺美术创意设计大赛，以习近平新时代中国特色社会主义思想为指导，全面贯彻落实widet大赛精神、widet大赛精神。',
        category: '设计创意',
        date: '2025-06-17',
        views: 19710,
        image: '/src/assets/images/tech1.jpg'
    }
]);
const selectedContest = ref(null);
const selectContest = (contest) => {
    selectedContest.value = contest;
};
onMounted(() => {
    if (contests.value.length > 0) {
        selectedContest.value = contests.value[0];
    }
});
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "contest-page" },
});
;
const __VLS_0 = __VLS_asFunctionalComponent(ContestHeader, new ContestHeader({
    title: "竞赛资讯",
}));
const __VLS_1 = __VLS_0({
    title: "竞赛资讯",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "contest-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "contest-list" },
});
for (const [contest] of __VLS_getVForSourceType((__VLS_ctx.contests))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectContest(contest);
            } },
        key: (contest.id),
        ...{ class: "contest-item" },
        ...{ class: ({ 'active': __VLS_ctx.selectedContest?.id === contest.id }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "contest-item-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "category-tag" },
    });
    (contest.category);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "item-title" },
    });
    (contest.title);
}
if (__VLS_ctx.selectedContest) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "contest-detail" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.selectedContest.image),
        alt: (__VLS_ctx.selectedContest.title),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "detail-title" },
    });
    (__VLS_ctx.selectedContest.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-meta" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-date" },
    });
    (__VLS_ctx.selectedContest.date);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-views" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fas fa-eye" },
    });
    (__VLS_ctx.selectedContest.views);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-description" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.selectedContest.description);
}
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
;
;
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ContestHeader: ContestHeader,
            contests: contests,
            selectedContest: selectedContest,
            selectContest: selectContest,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
