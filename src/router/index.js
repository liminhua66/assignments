import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Play from '@/views/Play'
import Search from '@/views/Search'
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/layout"
        },
        {
            path: "/layout",
            component: Layout,
            redirect: "/layout/home",
            children: [
                {
                    path: "home",
                    component: Home,
                    meta: {
                        title: "首页"
                    }
                },
                {
                    path: "search",
                    component: Search,
                    meta: {
                        title: "搜索"
                    }
                }
            ]
        },
        {
            path: "/play",
            component: Play
        },

    ]
})

export default router