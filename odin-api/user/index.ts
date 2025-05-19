import { get } from "../request/http";

const namespace = "/user";

// Front 获取当前用户信息
export const current = () => {
  const path = `${namespace}/current`;
  return get(path);
};
