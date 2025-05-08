import { Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";

@Controller("mail")
export class MailController {
  // Back 查询所有邮件列表
  @Get("query")
  @HttpCode(HttpStatus.OK)
  async queryList() {}

  // Front 获取用户自己的邮件列表
  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async findList() {}

  // Front Back 获取邮件详情
  @Get("detail/:id")
  @HttpCode(HttpStatus.OK)
  async detail() {}

  // Front 发送邮件
  @Post("send")
  @HttpCode(HttpStatus.OK)
  async send() {}
}
