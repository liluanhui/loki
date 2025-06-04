import Layout from "@/views/activity/layout.vue";
import { generateTitle } from "./utils";
import mzzx20250819 from "@/views/activity/20250819/index.vue";

const list: { path: string; name: string; component: any; titleKey: string }[] = [
  { path: "20250819", name: "mzzx20250819", component: mzzx20250819, titleKey: "mzzx20250819" },
];

const routes = [
  {
    path: "/a",
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
