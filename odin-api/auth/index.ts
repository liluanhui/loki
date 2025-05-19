import { post } from "../request/http";
import { LoginForm, LoginRes } from "@loki/odin/src/types/auth";

const namespace = "/auth";

// 用户登录
export const login = (data: LoginForm) => {
  const path = `${namespace}/login`;
  return post<LoginRes>(path, data);
};
