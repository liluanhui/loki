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

    const validators = [
      { condition: !title || !content, error: "TITLE_OR_CONTENT_EMPTY" },
      { condition: word_count && word_count > 10000, error: "WORD_COUNT_LIMIT" },
      { condition: !["private", "publish"].includes(type), error: "MAIL_TYPE_ERROR" },
      { condition: !["full", "privary", "anonymity"].includes(public_type), error: "PUBLIC_TYPE_ERROR" },
      { condition: !["self", "email"].includes(recipient_type), error: "RECIPIENT_TYPE_ERROR" },
      { condition: recipient_type === "email" && !isEmail(recipient_email), error: "RECIPIENT_EMAIL_ERROR" },
      { condition: recipient_type && recipient_name.length > 30, error: "RECIPIENT_NAME_LIMIT" },
      { condition: plan_deliver_at && new Date(plan_deliver_at).getTime() < Date.now(), error: "PLAN_DELIVER_TIME_ERROR" },
    ];
    for (const { condition, error } of validators) {
      if (condition) {
        paramsError(getResponseMsg("MailDraft", error, req));
      }
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
