import configuration from 'config/configuration';
import { RESPONSE_CODE, Response } from 'src/types/http';
import { responseEncrypt } from './encrypt';

/**
 * @description: 构造统一返回体
 * @param data - 返回的数据
 * @param msg - 返回的消息
 * @param code - 返回的状态码，默认为 RESPONSE_CODE.SUCCESS
 * @returns Response<T>
 */
const createResponse = <T = any>(
  data: T,
  msg: string,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => {
  return { data, msg, code };
};

/**
 * @description: 统一返回体
 * @param data - 返回的数据
 * @param msg - 返回的消息
 * @param code - 返回的状态码，默认为 RESPONSE_CODE.SUCCESS
 * @returns Response<T>
 */
export const responseMessage = <T = any>(
  data: T,
  msg: string,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => {
  const response = createResponse(data, msg, code);
  return configuration()['env'] === 'development' ? response : responseEncrypt(response);
};

/**
 * @description: 统一返回体，无加密
 * @param data - 返回的数据
 * @param msg - 返回的消息
 * @param code - 返回的状态码，默认为 RESPONSE_CODE.SUCCESS
 * @returns Response<T>
 */
export const responseMessageWithNoEncrypt = <T = any>(
  data: T,
  msg: string,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => {
  return createResponse(data, msg, code);
};
