import { ListResponse } from "../request";
import { get, post } from "../request/http";
import { PublicLetterCommentForm, PublicLetterCommentSearchParams } from "@loki/odin/src/types/publicLetter/comment";

const namespace = "/publicLetter/comment";

// Front 获取公开信评论列表
export const findPublicLetterCommentList = (params: PublicLetterCommentSearchParams) => {
  const path = `${namespace}/list`;
  return get<ListResponse<any>>(path, params);
};

// Front 添加公开信评论
export const addPublicLetterComment = (data: PublicLetterCommentForm) => {
  const path = `${namespace}/add`;
  return post<string>(path, data);
};

// Front 删除公开信评论
export const delPublicLetterComment = (id: string) => {
  const path = `${namespace}/del`;
  return post<string>(path, { id });
};
