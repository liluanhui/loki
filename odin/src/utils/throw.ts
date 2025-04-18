import { HttpException, HttpStatus } from '@nestjs/common';

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
export const paramsError = (message: string = '参数错误') => {
  throwException(message, HttpStatus.BAD_REQUEST);
};

/**
 * 业务错误
 * @param message
 */
export const businessError = (message: string) => {
  throwException(message, HttpStatus.OK);
};
