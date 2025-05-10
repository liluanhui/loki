import { useStorage } from "@vueuse/core";

export type ThridLoginType = "github";

/**
 * @description 三方登录
 */
export const useThridLogin = () => {
  const github = {
    oauth_uri: "https://github.com/login/oauth/authorize",
    redirect_uri: "https://www.moya.plus/oauth/github",
    client_id: "Ov23liVeXYNSN1WzLEAu",
  };

  const auth_url = {
    github_dev: `${github.oauth_uri}?client_id=81321e4dc5942467ba1a&redirect_uri=http://127.0.0.1:5176/oauth/github`,
    github: `${github.oauth_uri}?client_id=${github.client_id}&redirect_uri=${github.redirect_uri}`,
  };

  /**
   * @description 登录
   * @param type
   * @param target
   * @returns
   */
  const doLogin = (type: ThridLoginType, target = "_blank") => {
    const state = useStorage("thrid-login", { type: null, result: null }, null, { listenToStorageChanges: true });
    state.value.type = type;

    // @ts-ignore
    const env = import.meta.env.MODE;
    const url = env === "dev" ? auth_url[`${type}_dev`] : auth_url[type];

    if (target === "_blank") {
      window.open(url);
      return;
    }

    window.location.href = url;
  };

  return {
    auth_url,
    doLogin,
  };
};
