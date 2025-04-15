import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home/index.vue";
import Layout from "@/views/layout/index";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "/a",
        name: "home",
        component: home,
        meta: {
          title: "首页",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
