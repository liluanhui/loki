import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { DraftForm } from "src/types/mail/draft";
import { isEmail } from "src/utils/helper";
import { getResponseMsg, paramsError } from "src/utils/throw";

@Controller("mail/draft")
export class DraftController {
  // Front 新增草稿
  @Post("add")
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: DraftForm, @Req() req: Request) {
    const { title, content, type, plan_deliver_at, public_type, recipient_type, recipient_email, recipient_name, word_count } = body;
    if (!title || !content) {
      paramsError(getResponseMsg("MailDraft", "TITLE_OR_CONTENT_EMPTY", req));
    }
    if (word_count && word_count > 10000) {
      paramsError("字数不能超过10000个字");
    }

    if (["private", "publish"].indexOf(type) === -1) {
      paramsError("邮件类型错误");
    }
    if (["full", "privary", "anonymity"].indexOf(public_type) === -1) {
      paramsError("公开类型错误");
    }
    if (["self", "email"].indexOf(recipient_type) === -1) {
      paramsError("收件人类型错误");
    }

    if (recipient_type && !isEmail(recipient_email) && recipient_type === "email") {
      paramsError("收件人邮箱地址错误");
    }
    if (recipient_type && recipient_name.length > 30) {
      paramsError("收件人名称过长，不能超过30个字符");
    }
    if (plan_deliver_at && new Date(plan_deliver_at).getTime() < Date.now()) {
      paramsError("计划投递时间不能小于当前时间");
    }

    return body;
  }

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
