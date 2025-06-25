import { ref, computed } from 'vue';
import ContestHeader from '../components/ContestHeader.vue';
const courseTypes = ['自动化', '高等数学', '物理', '数据分析', '人工智能'];
const selectedTypes = ref([]);
const courses = ref([
    { id: 1, title: '自动化控制基础', type: '自动化', description: '学习自动化系统的基本原理与控制方法', image: '/src/assets/images/tech1.jpg', duration: 10 },
    { id: 2, title: 'PLC编程技术', type: '自动化', description: '掌握可编程逻辑控制器的编程与应用', image: '/src/assets/images/tech1.jpg', duration: 8 },
    { id: 3, title: '微积分（上）', type: '高等数学', description: '高等数学基础课程，涵盖极限、导数与积分', image: '/src/assets/images/tech1.jpg', duration: 11 },
    { id: 4, title: '线性代数', type: '高等数学', description: '矩阵理论与线性方程组求解方法', image: '/src/assets/images/tech1.jpg', duration: 10 },
    { id: 5, title: '大学物理（力学）', type: '物理', description: '经典力学基本原理与应用', image: '/src/assets/images/tech1.jpg', duration: 28 },
    { id: 6, title: '电磁学基础', type: '物理', description: '电场与磁场的基本理论', image: '/src/assets/images/tech1.jpg', duration: 32 },
    { id: 7, title: 'Python数据分析', type: '数据分析', description: '使用Python进行数据处理与可视化', image: '/src/assets/images/tech1.jpg', duration: 22 },
    { id: 8, title: '机器学习实战', type: '数据分析', description: '基于真实数据集的机器学习算法应用', image: '/src/assets/images/tech1.jpg', duration: 22 },
    { id: 9, title: '神经网络入门', type: '人工智能', description: '深度学习基础与神经网络原理', image: '/src/assets/images/tech1.jpg', duration: 32 },
    { id: 10, title: '自然语言处理', type: '人工智能', description: '文本分析与语言模型应用', image: '/src/assets/images/tech1.jpg', duration: 28 }
]);
const filteredCourses = computed(() => {
    if (selectedTypes.value.length === 0)
        return courses.value;
    return courses.value.filter(course => selectedTypes.value.includes(course.type));
});
const toggleType = (type) => {
    const index = selectedTypes.value.indexOf(type);
    if (index === -1) {
        selectedTypes.value.push(type);
    }
    else {
        selectedTypes.value.splice(index, 1);
    }
};
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "course-page" },
});
;
const __VLS_0 = __VLS_asFunctionalComponent(ContestHeader, new ContestHeader({
    title: "精品课程",
}));
const __VLS_1 = __VLS_0({
    title: "精品课程",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "course-type-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tag-container" },
});
for (const [type] of __VLS_getVForSourceType((__VLS_ctx.courseTypes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleType(type);
            } },
        key: (type),
        ...{ class: "tag" },
        ...{ class: ({ 'tag-selected': __VLS_ctx.selectedTypes.includes(type) }) },
    });
    (type);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "course-list" },
});
for (const [course] of __VLS_getVForSourceType((__VLS_ctx.filteredCourses))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (course.id),
        ...{ class: "course-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (course.image),
        alt: (course.title),
        ...{ class: "course-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "course-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (course.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (course.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "course-meta" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (course.type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (course.duration);
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ContestHeader: ContestHeader,
            courseTypes: courseTypes,
            selectedTypes: selectedTypes,
            filteredCourses: filteredCourses,
            toggleType: toggleType,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
