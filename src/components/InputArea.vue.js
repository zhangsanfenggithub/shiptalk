import { ref, inject } from 'vue';
const input = ref('');
const addMessage = inject('addMessage');
const send = () => {
    if (input.value.trim()) {
        addMessage({ text: input.value, type: 'user' });
        input.value = '';
    }
};
debugger;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
