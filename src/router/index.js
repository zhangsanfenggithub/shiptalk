import { createRouter, createWebHistory } from 'vue-router';
import Chat from '../views/Chat.vue';
import NaviGEM from '../views/NaviGEM.vue';
import Contest from '../views/Contest.vue';
import Course from "/@/views/Course.vue";
import Test from '../views/Test.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: NaviGEM
        },
        {
            path: '/chat',
            name: 'Chat',
            component: Chat
        },
        {
            path: '/contest',
            name: 'Contest',
            component: Contest
        },
        {
            path: '/courses',
            name: 'Course',
            component: Course
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
});
export default router;
