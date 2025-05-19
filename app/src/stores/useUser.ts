import { _localStorage } from "@loki/fpo-ui/utils/localStorage";
import { defineStore } from "pinia";
import { Message } from "birdpaper-ui";
import router from "../router/index";
import { LoginForm } from "@loki/odin/src/types/auth";
import { current, login } from "@loki/odin-api";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      /** 用户信息 */
      userInfo: {},
      /** 是否已登录 */
      logined: false,
    };
  },
  getters: {
    uid() {
      return this.userInfo.uid;
    },
    hasAdminPerm() {
      return this.userInfo.permission?.b?.length !== 0;
    },
  },
  actions: {
    /**
     * 执行登录
     * @param {LoginForm} data
     */
    async handleLogin(data: LoginForm) {
      const res = await login(data);
      if (res.code != 0) {
        throw new Error(res.msg);
      }

      _localStorage.save("_token", res.data.token);
      await this.getUserInfo();

      // 加入延时让弹框动画完成
      this.$patch({ logined: true });
    },
    /** 获取当前登录的用户信息 */
    async getUserInfo() {
      try {
        const res = await current();
        if (res.code != 0) {
          throw new Error(res.msg);
        }
        this.$patch({ userInfo: res.data });
        return res.data;
      } catch (error) {
        console.log('error: ', error);
        this.handleLogout(true);
      }
    },
    /** 执行退出账户 */
    handleLogout(noMessage = false, cbLogin = false) {
      _localStorage.remove("_token");
      this.$patch({ logined: false, userInfo: {} });
      cbLogin && router.replace({ name: "account-login" });
      !noMessage && Message.success("退出成功");
    },
    /** 判断用户是否登录 */
    isLogin(): boolean {
      const hasToken = !!_localStorage.find("_token");

      this.$patch({ logined: hasToken });
      return hasToken;
    },
  },
});
