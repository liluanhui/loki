import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import NProgress from "nprogress";
import { useUserStore } from "@/stores/useUser";
import appRoutes from "./app-routes";
import activityRoutes from "./activity-routes";

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...appRoutes, ...activityRoutes],
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
