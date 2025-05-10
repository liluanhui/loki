import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * 抛出异常
 * @param message
 * @param status
 */
export const throwException = (message: string, status: number) => {
  throw new HttpException(message, status);
};

/**
 * 参数错误
 * @param message
 */
export const paramsError = (message: string = "Params Error") => {
  throwException(message, HttpStatus.BAD_REQUEST);
};

/**
 * 业务错误
 * @param message
 */
export const businessError = (message: string) => {
  throwException(message, HttpStatus.OK);
};

export const getResponseMsg = (module:string,messageEnum: string, req: Request) => {
  let lang = req.headers["langs"] || "zh-CN";
  // TODO: 这里需要根据目录结构获取支持的语言
  if (["en", "zh-CN"].indexOf(lang) === -1) {
    lang = "zh-CN";
  }

  const message = require(`../langs/${lang}/index`);
  return message[module][messageEnum];
};
