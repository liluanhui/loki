import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../types/http';
import { responseMessage } from 'src/utils/http';

@Injectable()
export class SuccessResponse<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const _DEFAULT_MSG = '成功';
    const _SUCCESS_CODE = 0;

    return next.handle().pipe(
      map((response) => {
        if (response && typeof response === 'object' && 'data' in response) {
          return responseMessage(
            response.data,
            response.msg || _DEFAULT_MSG,
            response.code || _SUCCESS_CODE,
          );
        } else {
          return responseMessage(response, _DEFAULT_MSG, _SUCCESS_CODE);
        }
      }),
    );
  }
}
