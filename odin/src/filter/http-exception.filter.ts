import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { responseMessageWithNoEncrypt } from 'src/utils/http';

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse<Response>();
    // 获取状态码
    const statusCode = exception.getStatus();
    const res = exception.getResponse();

    response
      .status(statusCode)
      .json(
        responseMessageWithNoEncrypt(
          res['data'] || null,
          res['msg'] || exception.message || '服务器异常',
          statusCode === HttpStatus.OK ? -1 : statusCode,
        ),
      );
  }
}
