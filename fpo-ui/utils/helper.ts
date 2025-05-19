import JsEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

// @ts-ignore
const publicPem = import.meta.env.VITE_RSA_PUBLIC;

/**
 * 判断对象是否为数组
 * @param obj
 * @returns
 */
export const isArray = (obj: any) => {
  return obj && typeof obj == "object" && obj instanceof Array;
};

/**
 * 校验邮箱格式
 * @param {*} data
 */
export const isEmail = (data: any) => {
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(data);
};

/**
 * 校验手机格式
 * @param {*} data
 */
export const isPhone = (data: any) => {
  let reg = /^1[3456789]\d{9}$/;
  return reg.test(data);
};

/**
 * 密码校验，6-16位大小写
 * @param {*} data
 * @returns
 */
export const isPassword = (data: any) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return reg.test(data);
};

/**
 * 对象深拷贝
 * @param tSource
 * @returns
 */
export const deepClone = <T>(tSource: T, tTarget?: any | T): T => {
  if (isArray(tSource)) {
    tTarget = tTarget || [];
  } else {
    tTarget = tTarget || {};
  }
  for (const key in tSource) {
    if (Object.prototype.hasOwnProperty.call(tSource, key)) {
      if (typeof tSource[key] === "object" && typeof tSource[key] !== null) {
        tTarget[key] = isArray(tSource[key]) ? [] : {};
        deepClone(tSource[key], tTarget[key]);
      } else {
        tTarget[key] = tSource[key];
      }
    }
  }
  return tTarget as T;
};

/**
 * 对象浅拷贝
 * @param tSource
 * @returns
 */
export const simpleClone = <T>(tSource: T, tTarget?: any | T): T => {
  if (isArray(tSource)) {
    tTarget = tTarget || [];
  } else {
    tTarget = tTarget || {};
  }
  for (const key in tSource) {
    if (Object.prototype.hasOwnProperty.call(tSource, key)) {
      tTarget[key] = tSource[key];
    }
  }
  return tTarget as T;
};

/**
 * 禁止页面滚动
 */
export const pageStop = () => {
  let scrollTop = window.scrollY; //滚动的高度；
  document.body.style.overflow = "hidden";
  var mo = function (e) {
    e.preventDefault();
  };
  document.addEventListener("touchmove", mo, false); //禁止页面滑动
  return scrollTop;
};

/**
 * 取消滑动限制
 */
export const pageMove = (location: number) => {
  var mo = function (e) {
    e.preventDefault();
  };
  document.body.style.overflow = "";
  document.removeEventListener("touchmove", mo, false);
  window.scrollTo(0, location);
};

/**
 * Aes 解密
 * @param {String} data
 * @param {String} key
 * @returns encrypted
 */
export function aesDecrypt(data: any, customer_key = "") {
  var key = CryptoJS.enc.Utf8.parse(customer_key);

  var encryptedHex = CryptoJS.enc.Hex.parse(data);
  var encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
  var decrypt = CryptoJS.AES.decrypt(encryptedBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

/**
 * Aes 加密
 * @param {String} data
 * @param {String} customer_key
 * @returns encrypted
 */
export function aesEncrypt(data: unknown, customer_key: string = "") {
  var key = CryptoJS.enc.Utf8.parse(customer_key);
  var messageHex = CryptoJS.enc.Utf8.parse(data);
  var encrypted = CryptoJS.AES.encrypt(messageHex, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * Rsa 加密
 */
export function rsaEncrypt(rawData: string) {
  let data = null;
  try {
    var rsa = new JsEncrypt({
      default_key_size: "2048",
    });
    rsa.setPublicKey(publicPem);
    data = rsa.encrypt(rawData);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * 请求加密
 * @param params unkown
 */
export function requestEncrypt(params: unknown) {
  const trans = CryptoJS.enc.Utf8.parse(JSON.stringify(params));
  const dataText = CryptoJS.enc.Base64.stringify(trans);
  let rawKey = dataText.substr(0, 16);
  if (rawKey.length < 16) {
    rawKey = rawKey.padEnd(16, "a");
  }
  const data = aesEncrypt(JSON.stringify(params), rawKey);
  const key = rsaEncrypt(rawKey);
  return { key, data };
}

/**
 * 响应解密
 * @param params unkown
 */
export function responseDecrypt(params: string | { data: string; key: string }) {
  const d = typeof params === "string" ? JSON.parse(params) : params;
  const { data, key } = d;
  if (!data || !key) throw new Error("响应数据解析失败");

  return JSON.parse(aesDecrypt(data, key));
}

/**
 * 获取当前时间戳
 * @returns string
 */
export function getTimestamp() {
  var tmp = Date.parse(new Date() as unknown as string).toString();
  tmp = tmp.substr(0, 10);
  return tmp;
}

/**
 * 生成随机字符串
 * @param {number} [len=11]
 * @param {string} [prefix='']
 * @param {number} [randomType=2]
 * @returns
 */
export function randomString(len = 11, prefix = "", randomType = 2) {
  // 随机字符范围
  let text;
  let randomText = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];

  // 根据 randomType 选择字符范围
  if (randomType === 2) {
    text = randomText[0] + randomText[1];
  } else {
    text = randomText[randomType];
  }

  let tmp = "",
    i = 0,
    l = text.length;

  for (i = 0; i < len; i++) {
    tmp += text.charAt(Math.floor(Math.random() * l));
  }
  return prefix + tmp;
}

/** 获取 URL 路径 */
export function getUrlPath() {
  const path = window.location.hash.split("#")[1];

  return path;
}

/** 判断元素是否滑动到了底部 */
export function isScrollBottom(el: Element) {
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

  const docELHeight = el.scrollHeight;
  const scrollTop = el.scrollTop;

  return scrollTop == docELHeight - clientHeight;
}

/**
 * 根据当前时间格式化
 * @param time
 * @returns
 */
export function formatTimeFromNow(time: string) {
  return dayjs(time).locale("zh-CN").fromNow();
}
