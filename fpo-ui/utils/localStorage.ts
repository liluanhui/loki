export const _localStorage = {
  /**
   * 查找
   * @param key  key
   * @param parse 是否反序列化
   */
  find(key: string, parse: boolean = false): string | object | Array<unknown> {
    try {
      const data: string = window.localStorage.getItem(key) ?? "";

      if (parse && data) {
        return JSON.parse(data);
      }

      return data;
    } catch (err) {
      return "";
    }
  },
  /**
   * 保存
   * @param key key
   * @param data 数据包
   * @param stringify 是否序列化
   */
  save(key: string, data: string | object | Array<unknown>, stringify: boolean = false): boolean {
    try {
      const saveData: string = stringify ? JSON.stringify(data) : (data as string);
      window.localStorage.setItem(key, saveData);

      return true;
    } catch (err) {
      return false;
    }
  },
  /**
   * 删除缓存
   * @param key
   */
  remove(key: string): boolean {
    try {
      window.localStorage.removeItem(key);

      return true;
    } catch (err) {
      return false;
    }
  },
};
