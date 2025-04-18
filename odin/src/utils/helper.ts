/**
 * 生成随机字符串
 * @param {number} [len=11]
 * @param {string} [prefix='']
 * @param {number} [randomType=2]
 * @returns
 */
export const randomString = (
  len: number = 11,
  prefix: string = '',
  randomType: number = 2,
): string => {
  const charSets = ['abcdefghijklmnopqrstuvwxyz', '0123456789'];
  const text = randomType === 2 ? charSets.join('') : charSets[randomType];
  let result = '';

  for (let i = 0; i < len; i++) {
    result += text.charAt(Math.floor(Math.random() * text.length));
  }

  return prefix + result;
};

/**
 * 处理分页查询条件以供模型使用
 * @param {String|Number} pageNum 当前页码
 * @param {String|Number} pageSize 每页条数
 * @returns offset，limit
 */
export const handlePageLimit = (pageNum: number, pageSize: number) => {
  return {
    offset: Number(pageNum) === 1 ? 0 : Number(pageSize) * Number(pageNum - 1),
    limit: Number(pageSize),
  };
};

/**
 * 判断是否为邮箱
 * @param data
 * @returns
 */
export const isEmail = (data: any) => {
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(data);
};

/**
 * 判断是否为手机号
 * @param data
 * @returns
 */
export const isPhone = (data: any) => {
  let reg = /^1[3456789]\d{9}$/;
  return reg.test(data);
};

/**
 * 判断是否为密码
 * @param data
 * @returns
 */
export const isPassword = (data: any) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return reg.test(data);
};

/**
 * 获取时间戳-秒
 * @param time
 * @returns
 */
export const getTimeStamp = (time: string = '') => {
  const timeStamp = time ? Date.parse(time) : new Date().getTime();
  return Math.floor(timeStamp / 1000);
};

export const isUrl = (data: string) => {
  if (!data) return true;

  var v = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i',
  );
  return v.test(data);
};
