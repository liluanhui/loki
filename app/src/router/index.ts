import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import home from "@/views/home/index.vue";
import publicLetter from "@/views/public/index.vue";
import write from "@/views/write/index.vue";
import personal from "@/views/personal/index.vue";
import test from "@/views/test/index.vue";
import Layout from "@/views/layout/index";
import { useStorage } from "@vueuse/core";
import NProgress from "nprogress";
import { useUserStore } from "@/stores/useUser";

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
    personal: "个人中心",
  },
  en: {
    home: "Home",
    public: "Public Letter",
    write: "Write",
    tool: "Toolbox",
    about: "About",
    personal: "Personal Center",
  },
};

// 动态生成 meta.title 的工具函数
const generateTitle = (key: keyof (typeof routeName)["zh_CN"]) => {
  return `${routeName[currentLang.value][key]} | ${siteTitle[currentLang.value]}`;
};

// 路由配置数组
const routeConfig: { path: string; name: string; component: any; titleKey: "home" | "public" | "write" | "tool" | "about" | "personal" }[] =
  [
    { path: "/", name: "home", component: home, titleKey: "home" },
    { path: "/public", name: "public", component: publicLetter, titleKey: "public" },
    { path: "/write", name: "write", component: write, titleKey: "write" },
    { path: "/personal", name: "personal", component: personal, titleKey: "personal" },
    { path: "/test", name: "test", component: test, titleKey: "home" }, // 示例：复用 home 的标题
  ];

// 动态生成 routes
const routes = [
  {
    path: "/",
    component: Layout,
    children: routeConfig.map((route) => ({
      path: route.path,
      name: route.name,
      component: route.component,
      meta: {
        title: generateTitle(route.titleKey),
      },
    })),
  },
];

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start();
  const { isLogin, getUserInfo, userInfo } = useUserStore();

  const _isLogin = isLogin();

  if (_isLogin && !userInfo.uid) {
    getUserInfo();
    next();
  } else {
    next();
  }
});

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
});

export default router;
