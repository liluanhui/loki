import { ListResponse } from "../request";
import { get, post } from "../request/http";
import { PublicLetterSearchParams } from "@loki/odin/src/types/publicLetter";

const namespace = "/publicLetter";

// 获取公开信列表
export const findPublicLetterList = (params: PublicLetterSearchParams) => {
  const path = `${namespace}/list`;
  return get<ListResponse<any>>(path, params);
};

// 获取公开信详情
export const getPublicLetterDetail = (id: string) => {
  const path = `${namespace}/detail/${id}`;
  return get<any>(path);
};

// 获取自己的公开信列表
export const getSelfPublicLetterList = (params: PublicLetterSearchParams) => {
  const path = `${namespace}/self`;
  return get<ListResponse<any>>(path, params);
};

// 删除公开信
export const delPublicLetter = (id: string) => {
  const path = `${namespace}/del`;
  return post<string>(path, { id });
};
