import home from "@/views/home/index.vue";
import publicLetter from "@/views/public/index.vue";
import write from "@/views/write/index.vue";
import personal from "@/views/personal/index.vue";
import test from "@/views/test/index.vue";
import Layout from "@/views/layout/index";
import { generateTitle } from "./utils";

const list: { path: string; name: string; component: any; titleKey: string }[] = [
  { path: "/", name: "home", component: home, titleKey: "home" },
  { path: "/public", name: "public", component: publicLetter, titleKey: "public" },
  { path: "/write", name: "write", component: write, titleKey: "write" },
  { path: "/personal", name: "personal", component: personal, titleKey: "personal" },
  { path: "/test", name: "test", component: test, titleKey: "home" }, // 示例：复用 home 的标题
];

const routes = [
  {
    path: "/",
    component: Layout,
    children: list.map((route) => ({
      path: route.path,
      name: route.name,
      component: route.component,
      meta: {
        title: generateTitle(route.titleKey),
      },
    })),
  },
];

export default routes;
