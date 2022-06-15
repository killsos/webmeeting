import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/HomePage/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/LoginPage/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(), // history 模式则使用 createWebHistory()
    routes
})

export default router
