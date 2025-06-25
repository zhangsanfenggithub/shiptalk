import AiCard from './AiCard.vue';
const aiList = [
    {
        title: '思政型智能体',
        desc: '·国际船舶竞合案例库·船舶技术演进图谱·船舶领域标志性工程集·船舶行业先锋模范精神',
        bg: new URL('/@/assets/images/思政型-bg.jpg', import.meta.url).href,
        agentType: '思政型智能体对话',
    },
    {
        title: '课程型智能体',
        desc: '船舶类知识问答库船舶领域课程',
        bg: new URL('/@/assets/images/课程型-bg.jpg', import.meta.url).href,
        agentType: '课程型智能体对话',
    },
    {
        title: '竞赛型智能体',
        desc: '·省研电赛竞赛资讯库·研究生数模竞赛知识库·Iusses平台',
        bg: new URL('/@/assets/images/竞赛型-bg.jpg', import.meta.url).href,
        agentType: '竞赛型智能体对话',
    },
    {
        title: '探究型智能体',
        desc: '·AI引导式互动·多轮对话式答疑·文献分析整理',
        bg: new URL('/@/assets/images/探究型-bg.jpg', import.meta.url).href,
        agentType: '探究型智能体对话',
    },
    {
        title: '任务型智能体',
        desc: '·进度跟踪管理·学习任务反馈·学习时长记录',
        bg: new URL('/@/assets/images/任务型-bg.jpg', import.meta.url).href,
        agentType: '任务型智能体对话',
    },
    {
        title: '评价型智能体',
        desc: '·综合评价系统·优化反思系统·心理健康评分',
        bg: new URL('/@/assets/images/评价型-bg.jpg', import.meta.url).href,
        agentType: '评价型智能体对话',
    },
];
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ai-container" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.aiList))) {
    ;
    const __VLS_0 = __VLS_asFunctionalComponent(AiCard, new AiCard({
        key: (item.title),
        title: (item.title),
        desc: (item.desc),
        bg: (item.bg),
        agentType: (item.agentType),
    }));
    const __VLS_1 = __VLS_0({
        key: (item.title),
        title: (item.title),
        desc: (item.desc),
        bg: (item.bg),
        agentType: (item.agentType),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AiCard: AiCard,
            aiList: aiList,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
