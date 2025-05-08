import { Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";

@Controller("mail/draft")
export class DraftController {
  // Front 新增草稿
  @Post("add")
  @HttpCode(HttpStatus.OK)
  async create() {}

  // Front 编辑草稿
  @Post("edit")
  @HttpCode(HttpStatus.OK)
  async update() {}

  // Front 获取草稿详情
  @Get("detail/:id")
  @HttpCode(HttpStatus.OK)
  async detail() {}

  // Front 删除草稿
  @Post("del")
  @HttpCode(HttpStatus.OK)
  async delete() {}
}
