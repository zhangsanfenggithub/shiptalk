import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps();
const handleClick = () => {
    router.push({
        path: '/chat',
        query: { type: props.agentType }
    });
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ class: "ai-card" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.bg})` }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.desc) }, null, null);
;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            handleClick: handleClick,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
