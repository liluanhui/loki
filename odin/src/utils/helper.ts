import IP2Region from "ip2region";

/**
 * 生成随机字符串
 * @param {number} [len=11]
 * @param {string} [prefix='']
 * @param {number} [randomType=2]
 * @returns
 */
export const randomString = (len: number = 11, prefix: string = "", randomType: number = 2): string => {
  const charSets = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
  const text = randomType === 2 ? charSets.join("") : charSets[randomType];
  let result = "";

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
export const getTimeStamp = (time: string = "") => {
  const timeStamp = time ? Date.parse(time) : new Date().getTime();
  return Math.floor(timeStamp / 1000);
};

export const isUrl = (data: string) => {
  if (!data) return true;

  var v = new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  );
  return v.test(data);
};

/**
 * @description: 获取客户端真实 IP
 * @param {Request} req
 */
export const getRealIp = (req: Request): string => {
  const result = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req["socket"].remoteAddress || req["ip"];
  let ip = Array.isArray(result) ? result[0] : result;
  if (ip.indexOf("::ffff:") !== -1) {
    ip = ip.substring(7);
  }
  return ip || "";
};

/**
 * @description: 根据 IP 查询地区
 * @param ip 
 * @returns 
 */
export const searchIpRegion = async (ip: string) => {
  const query = new IP2Region();
  try {
    const result = query.search(ip);
    return result;
  } catch (error) {
    return "IP location not found";
  }
};

/**
 * 将32位无符号整数转换为IPv4地址字符串
 * @param int - 32位无符号整数
 * @returns 对应的IPv4地址字符串，格式为"xxx.xxx.xxx.xxx"
 * @throws 当输入不是有效的32位无符号整数时抛出错误
 */
export function intToIp(int: number): string {
  if (typeof int !== 'number' || !Number.isInteger(int) || int < 0 || int > 0xFFFFFFFF) {
    return '';
  }
  return [
    (int >>> 24) & 0xFF,
    (int >>> 16) & 0xFF,
    (int >>> 8) & 0xFF,
    int & 0xFF
  ].join('.');
}

/**
 * 将IPv4地址字符串转换为32位无符号整数
 * @param ip - IPv4地址字符串，格式为"xxx.xxx.xxx.xxx"
 * @returns 对应的32位无符号整数，或抛出错误
 * @throws 当IP格式无效或数值超出范围时抛出错误
 */
export function ipToInt(ip: string): number {
  // 验证输入是否为字符串
  if (typeof ip !== 'string') {
    throw new TypeError('输入必须是字符串');
  }

  // 使用正则表达式验证IP格式
  const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipRegex);

  if (!match) {
    throw new Error('无效的IP地址格式');
  }

  // 解析四个部分并验证范围
  const parts = match.slice(1).map(Number);
  for (const part of parts) {
    if (part < 0 || part > 255) {
      throw new Error('IP地址的每个部分必须在0-255之间');
    }
  }

  // 转换为32位无符号整数
  // 使用位运算确保结果为32位整数
  let result = 0;
  for (let i = 0; i < 4; i++) {
    result = (result << 8) | parts[i];
  }

  // 确保结果为无符号整数（处理JavaScript中的符号问题）
  return result >>> 0;
}