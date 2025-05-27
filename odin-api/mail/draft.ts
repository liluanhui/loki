import { ListResponse } from "odin-api/request";
import { get, post } from "../request/http";
import { DraftForm, DraftListItem } from "@loki/odin/src/types/mail/draft";

const namespace = "/mail/draft";

// Front 查询草稿列表
export const findDraftList = (query: { pageNum: number; pageSize: number }) => {
  const path = `${namespace}/list`;
  return get<ListResponse<DraftListItem[]>>(path, query);
};

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

// Front 获取草稿详情
export const draftDetail = (id: string) => {
  const path = `${namespace}/detail/${id}`;
  return get<any>(path);
};

// Front 删除草稿
export const delDraft = (data: { id: string }) => {
  const path = `${namespace}/del`;
  return post<string>(path, data);
};
