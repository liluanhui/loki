import { get, post } from "../request/http";
import { DraftForm } from "@loki/odin/src/types/mail/draft";

const namespace = "/mail/draft";

// Front 新增草稿
export const addDraft = (data: DraftForm) => {
  const path = `${namespace}/add`;
  return post<string>(path, data);
};

// Front 编辑草稿
export const editDraft = (data: DraftForm) => {
  const path = `${namespace}/edit`;
  return post<string>(path, data);
};

// Front 编辑草稿
export const 获取草稿详情 = (id: string) => {
  const path = `${namespace}/detail/${id}`;
  return get(path);
};

// Front 删除草稿
export const delDraft = (data: { id: string }) => {
  const path = `${namespace}/del`;
  return post<string>(path, data);
};
