// eslint-disable-next-line no-unused-vars
import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";
import { Public } from "./auth/auth.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(@Req() Req: Request): any {
    return this.appService.getHello(Req);
  }
}
