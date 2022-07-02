import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from 'vue'
import Layout from '@/layout/index.vue'
import Home from "@/views/home/index.vue";
import Doc from "@/views/doc/index.vue";
import Demo from "@/views/demo/index.vue";

const history = createWebHistory();
import { docRoutes } from "./doc-routes.js";

const router = createRouter({
  history,
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/demo", component: Demo },
    { path: "/home", component: Home },
    {
      path: "/doc",
      redirect: "/doc/intro",
      component: Layout,
      children: docRoutes,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      nextTick(() => {
        const el = document.querySelector(to.hash)
        if (el) el.scrollIntoView()
      })
    }
  }
});

export default router;