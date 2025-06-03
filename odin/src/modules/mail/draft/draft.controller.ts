import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req } from "@nestjs/common";
import { FpoMailDraft } from "src/models/fpo_mail_draft.model";
import { DraftForm } from "src/types/mail/draft";
import { handlePageLimit, isEmail, randomString } from "src/utils/helper";
import { businessError, getResponseMsg, paramsError } from "src/utils/throw";
import { DraftService } from "./draft.service";

@Controller("mail/draft")
export class DraftController {
  constructor(private draftService: DraftService) {}

  // Front 查询草稿列表
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async findList(@Query() query: { pageNum: number; pageSize: number }, @Req() req: Request) {
    const { pageNum, pageSize } = query;
    if (!pageNum || !pageSize) paramsError();

    const { offset, limit } = handlePageLimit(pageNum, pageSize);
    const { count, list } = await this.draftService.queryList(offset, limit, { uid: req["uid"] });

    return { count, list, pageNum, pageSize };
  }

  // Front 新增草稿
  @Post("add")
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: DraftForm, @Req() req: Request) {
    const { title, content, type, plan_deliver_at, public_type, recipient_type, recipient_email, recipient_name, word_count } = body;

    const validators = [
      // 邮件标题和内容不能为空
      { condition: !title || !content, error: "TITLE_OR_CONTENT_EMPTY" },
      // 邮件字数限制
      { condition: word_count && word_count > 10000, error: "WORD_COUNT_LIMIT" },
      // 邮件类型校验
      { condition: !["private", "public"].includes(type), error: "MAIL_TYPE_ERROR" },
      // 邮件类型校验
      { condition: !["full", "privary", "anonymity"].includes(public_type), error: "PUBLIC_TYPE_ERROR" },
      // 收件人类型校验
      { condition: !["self", "email"].includes(recipient_type), error: "RECIPIENT_TYPE_ERROR" },
      // 收件人邮箱校验
      { condition: recipient_type === "email" && recipient_email && !isEmail(recipient_email), error: "RECIPIENT_EMAIL_ERROR" },
      // 收件人名称长度限制
      { condition: recipient_type === "email" && recipient_name && recipient_name.length > 30, error: "RECIPIENT_NAME_LIMIT" },
      // 投递时间校验
      { condition: plan_deliver_at && new Date(plan_deliver_at).getTime() < Date.now(), error: "PLAN_DELIVER_TIME_ERROR" },
    ];
    for (const { condition, error } of validators) {
      if (condition) {
        paramsError(getResponseMsg("MailDraft", error, req));
      }
    }

    const id = randomString();
    await FpoMailDraft.create({
      id,
      uid: req["uid"],
      title,
      content,
      type,
      plan_deliver_at,
      public_type,
      recipient_type,
      recipient_email,
      recipient_name,
      word_count,
    });

    return {
      data: id,
      msg: getResponseMsg("MailDraft", "DRAFT_CREATE_SUCCESS", req),
    };
  }

  // Front 编辑草稿
  @Post("edit")
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: DraftForm, @Req() req: Request) {
    const { id, title, content, type, plan_deliver_at, public_type, recipient_type, recipient_email, recipient_name, word_count } = body;
    if (!id) {
      paramsError(getResponseMsg("MailDraft", "DRAFT_NOT_FOUND", req));
    }

    const validators = [
      // 邮件标题和内容不能为空
      { condition: !title || !content, error: "TITLE_OR_CONTENT_EMPTY" },
      // 邮件字数限制
      { condition: word_count && word_count > 10000, error: "WORD_COUNT_LIMIT" },
      // 邮件类型校验
      { condition: !["private", "public"].includes(type), error: "MAIL_TYPE_ERROR" },
      // 邮件类型校验
      { condition: !["full", "privary", "anonymity"].includes(public_type), error: "PUBLIC_TYPE_ERROR" },
      // 收件人类型校验
      { condition: !["self", "email"].includes(recipient_type), error: "RECIPIENT_TYPE_ERROR" },
      // 收件人邮箱校验
      { condition: recipient_type === "email" && recipient_email && !isEmail(recipient_email), error: "RECIPIENT_EMAIL_ERROR" },
      // 收件人名称长度限制
      { condition: recipient_type === "email" && recipient_name && recipient_name.length > 30, error: "RECIPIENT_NAME_LIMIT" },
      // 投递时间校验
      { condition: plan_deliver_at && new Date(plan_deliver_at).getTime() < Date.now(), error: "PLAN_DELIVER_TIME_ERROR" },
    ];

    for (const { condition, error } of validators) {
      if (condition) {
        paramsError(getResponseMsg("MailDraft", error, req));
      }
    }

    const draft = await FpoMailDraft.findOne({ where: { id, uid: req["uid"] } });
    if (!draft) {
      paramsError(getResponseMsg("MailDraft", "DRAFT_NOT_FOUND", req));
    }

    draft.title = title;
    draft.content = content;
    draft.type = type;
    draft.plan_deliver_at = plan_deliver_at as unknown as Date;
    draft.public_type = public_type;
    draft.recipient_type = recipient_type;
    draft.recipient_email = recipient_email;
    draft.recipient_name = recipient_name;
    draft.word_count = word_count;
    await draft.save();

    return {
      data: id,
      msg: getResponseMsg("MailDraft", "DRAFT_UPDATE_SUCCESS", req),
    };
  }

  // Front 获取草稿详情
  @Get("detail/:id")
  @HttpCode(HttpStatus.OK)
  async detail(@Param() param: { id: string }, @Req() req: Request) {
    const draft = await FpoMailDraft.findOne({
      where: { id: param.id },
      attributes: [
        "id",
        "title",
        "content",
        "type",
        "plan_deliver_at",
        "public_type",
        "recipient_type",
        "recipient_email",
        "recipient_name",
        "updated_at",
      ],
    });
    if (!draft) {
      paramsError(getResponseMsg("MailDraft", "DRAFT_NOT_FOUND", req));
    }

    return draft;
  }

  // Front 删除草稿
  @Post("del")
  @HttpCode(HttpStatus.OK)
  async delete(@Body() body: { id: string }, @Req() req: Request) {
    const { id } = body;
    if (!id) paramsError(getResponseMsg("MailDraft", "DRAFT_NOT_FOUND", req));
    
    const draft = await FpoMailDraft.findOne({ where: { id, uid: req["uid"] } });
    if (!draft) {
      businessError(getResponseMsg("MailDraft", "DRAFT_NOT_FOUND", req));
    }

    await draft.destroy();

    return {
      data: id,
      msg: getResponseMsg("MailDraft", "DRAFT_DELETE_SUCCESS", req),
    };
  }
}
