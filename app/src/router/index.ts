import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home/index.vue";
import publicLetter from "@/views/public/index.vue";
import write from "@/views/write/index.vue";
import test from "@/views/test/index.vue";
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
        path: "/public",
        name: "public",
        component: publicLetter,
        meta: {
          title: "公开信",
        },
      },
      {
        path: "/write",
        name: "write",
        component: write,
        meta: {
          title: "写信",
        },
      },
      {
        path: "/test",
        name: "test",
        component: test,
        meta: {
          title: "test",
        },
      },
    ],
  },
];

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
