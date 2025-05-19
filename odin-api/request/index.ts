export type HttpResponse<T = any> = {
  msg: string;
  code: number;
  data: T;
};

export type ListResponse<T = any> = {
  count: number;
  list: T[];
  pageNum: string;
  pageSize: string;
};
