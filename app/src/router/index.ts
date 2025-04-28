import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home/index.vue";
import publicLetter from "@/views/public/index.vue";
import write from "@/views/write/index.vue";
import test from "@/views/test/index.vue";
import Layout from "@/views/layout/index";
import { useStorage } from "@vueuse/core";

const currentLang = useStorage("lang", "zh_CN");
const siteTitle = {
  zh_CN: "未来邮局",
  en: "Feature Post Office.",
};
const routeName = {
  zh_CN: {
    home: "首页",
    public: "公开信",
    write: "写信",
    tool: "工具箱",
    about: "关于",
  },
  en: {
    home: "Home",
    public: "Public Letter",
    write: "Write",
    tool: "Toolbox",
    about: "About",
  },
};

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
          title: `${routeName[currentLang.value].home} | ${siteTitle[currentLang.value]}`,
        },
      },
      {
        path: "/public",
        name: "public",
        component: publicLetter,
        meta: {
          title: `${routeName[currentLang.value].public} | ${siteTitle[currentLang.value]}`,
        },
      },
      {
        path: "/write",
        name: "write",
        component: write,
        meta: {
          title: `${routeName[currentLang.value].write} | ${siteTitle[currentLang.value]}`,
        },
      },
      {
        path: "/test",
        name: "test",
        component: test,
        meta: {
          title: `${routeName[currentLang.value].home} | ${siteTitle[currentLang.value]}`,
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
