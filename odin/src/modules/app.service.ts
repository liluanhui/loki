import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(@Req() { headers }: Request): any {
    const { host, accept, allow } = headers;
    const name = this.configService.get<string>('name');
    const env = this.configService.get<string>('env');
    const version = this.configService.get<string>('version');

    return {
      title: `Hi, I'm ${name}.`,
      version,
      env,
      headers: { accept, allow, host },
    };
  }
}
