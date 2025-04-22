import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { aesDecryptHex } from 'src/utils/encrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new HttpException('请先登录', 401);
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['uid'] = payload.uid;
    } catch {
      throw new HttpException('登录失效', 401);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    try {
      const token = request.headers.authorization;
      return aesDecryptHex(token, this.configService.get<string>('aes_key'));
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
