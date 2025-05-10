import { ref } from "vue";
import { Message } from "birdpaper-ui";
import { HttpResponse } from "@moya/eddie-api";

export const useCrud = () => {
  /** 提交加载状态 */
  const submitLoading = ref<boolean>(false);
  /** 删除加载状态 */
  const delLoading = ref<boolean>(false);
  /** 列表加载状态 */
  const listLoading = ref<boolean>(false);
  /** 列表数据 */
  const list = ref<unknown[]>([]);
  /** 列表数据总数 */
  const count = ref<number>(0);

  /**
   * 读取列表数据
   * @param httpFunction 请求的接口方法
   * @param params 请求携带的参数
   */
  const readList = async (httpFunction: Function, params?: unknown) => {
    try {
      listLoading.value = true;

      const { code, msg, data } = (await httpFunction(params)) as HttpResponse;
      if (code != 0) throw new Error(msg);

      list.value = data.list;
      count.value = data.count;
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      listLoading.value = false;
    }
  };

  /**
   * 添加记录
   * @param httpFunction 请求的接口方法
   * @param params 请求携带的参数
   * @param callback 回调函数
   * @returns
   */
  const addRecord = async (httpFunction: Function, params: unknown, callback?: Function): Promise<Function> => {
    try {
      submitLoading.value = true;

      const { code, msg, data } = (await httpFunction(params)) as HttpResponse;
      if (code != 0) throw new Error(msg);

      Message.success(msg);
      return callback(data);
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      submitLoading.value = false;
    }
  };

  /**
   * 更新记录
   * @param httpFunction 请求的接口方法
   * @param params 请求携带的参数
   * @param callback 回调函数
   * @param pkName 主键字段
   * @returns
   */
  const updateRecord = async (
    httpFunction: Function,
    params: unknown,
    callback?: Function,
    pkName = "id"
  ): Promise<Function> => {
    try {
      submitLoading.value = true;
      if (!params[pkName]) throw new Error("ID 未传入");

      const { code, msg, data } = (await httpFunction(params)) as HttpResponse;
      if (code != 0) throw new Error(msg);

      Message.success(msg);
      return callback(data);
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      submitLoading.value = false;
    }
  };

  /**
   * 删除记录
   * @param httpFunction 请求的接口方法
   * @param primaryKey 主键 ID
   * @param callback 回调函数
   * @returns
   */
  const deleteRecord = async (httpFunction: Function, primaryKey: string, callback?: Function) => {
    try {
      delLoading.value = true;

      const { code, msg, data } = (await httpFunction(primaryKey)) as HttpResponse;
      if (code != 0) throw new Error(msg);

      Message.success(msg);
      return callback(data);
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      delLoading.value = false;
    }
  };

  return {
    readList,
    addRecord,
    updateRecord,
    deleteRecord,
    submitLoading,
    listLoading,
    list,
    count,
  };
};
