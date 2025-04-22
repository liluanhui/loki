/**
 * @description: 响应码
 */
export enum RESPONSE_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 0, // 请求成功
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  INTERNAL_SERVER_ERROR = 500, // 服务器错误
}

/**
 * @description: 全局响应体
 */
export type Response<T = any> =
  | {
      code: number; // 状态码
      data?: T; // 业务数据
      msg: string; // 响应信息
    }
  | { key: string; data: string }; // 加密数据;

/**
 * @description: 分页列表响应体
 */
export type ListResponse<T = any> = {
  count: number;
  list: T[];
  pageNum: number;
  pageSize: number;
};
