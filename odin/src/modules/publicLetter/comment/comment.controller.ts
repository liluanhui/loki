import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Public } from "src/modules/auth/auth.decorator";
import { PublicLetterCommentForm, PublicLetterCommentSearchParams } from "src/types/publicLetter/comment";
import { getResponseMsg, paramsError } from "src/utils/throw";
import { handlePageLimit, randomString } from "src/utils/helper";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";
import { FpoPublicMailComment } from "src/models/fpo_public_mail_comment.model";

@Controller("publicLetter/comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  // Front 获取公开信评论列表
  @Public()
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async findList(@Query() query: PublicLetterCommentSearchParams) {
    const { pageNum, pageSize, mail_id } = query;
    if (!pageNum || !pageSize || !mail_id) paramsError();

    const { offset, limit } = handlePageLimit(pageNum, pageSize);
    const { count, list } = await this.commentService.queryList(offset, limit, query);

    return { count, list, pageNum: Number(pageNum), pageSize: Number(pageSize) };
  }

  // Front 添加公开信评论
  @Post("add")
  @HttpCode(HttpStatus.OK)
  async add(@Body() body: PublicLetterCommentForm, @Req() req: Request) {
    const { mail_id, content, root_id, last_id, level } = body;

    if (!mail_id || !content) paramsError(getResponseMsg("Comment", "COMMENT_IS_EMPTY", req));
    if (![0, 1].includes(level)) {
      paramsError(getResponseMsg("Comment", "INVALID_LEVEL", req));
    }
    if (content.length > 500) {
      paramsError(getResponseMsg("Comment", "COMMENT_IS_LARGE", req));
    }

    // 公开信校验
    const letter = await FpoPublicMail.findByPk(mail_id);
    if (!letter) {
      paramsError(getResponseMsg("Comment", "LETTER_NOT_FOUND", req));
    }

    // 根评论校验
    let rootComment = null;
    if (root_id) {
      rootComment = await FpoPublicMailComment.findByPk(root_id);
      if (!rootComment) {
        paramsError(getResponseMsg("Comment", "COMMENT_NOT_FOUND", req));
      }
    }

    // 回复ID校验
    if (last_id) {
      const lastComment = await FpoPublicMailComment.findByPk(last_id);
      if (!lastComment) {
        paramsError(getResponseMsg("Comment", "COMMENT_NOT_FOUND", req));
      }
    }

    const id = randomString();
    await FpoPublicMailComment.create({
      id,
      uid: req["uid"],
      mail_id,
      content,
      root_id: root_id || null,
      last_id: last_id || null,
      level: level || 0,
    });

    // 更新公开信评论数
    letter.increment("comments", { by: 1 });
    await letter.save();

    // 如果是根评论，更新根评论的评论数
    if (root_id) {
      rootComment.increment("comments", { by: 1 });
      await rootComment.save();
    }

    return {
      msg: getResponseMsg("Comment", "COMMENT_ADD_SUCCESS", req),
      data: id,
    };
  }

  // Front 删除公开信评论
  @Post("del")
  @HttpCode(HttpStatus.OK)
  async delete(@Body() body: { id: string }, @Req() req: Request) {
    const { id } = body;
    if (!id) paramsError();

    // 评论校验
    const comment = await FpoPublicMailComment.findByPk(id);
    if (!comment) {
      paramsError(getResponseMsg("Comment", "COMMENT_NOT_FOUND", req));
    }

    // 只能删除自己的评论
    if (comment.uid !== req["uid"]) {
      paramsError(getResponseMsg("Comment", "NO_PERMISSION", req));
    }

    // 公开信校验
    const letter = await FpoPublicMail.findByPk(comment.mail_id);
    if (!letter) {
      paramsError(getResponseMsg("Comment", "LETTER_NOT_FOUND", req));
    }

    let rootComment = null;
    if (comment.root_id) {
      rootComment = await FpoPublicMailComment.findByPk(comment.root_id);
      if (!rootComment) {
        paramsError(getResponseMsg("Comment", "COMMENT_NOT_FOUND", req));
      }
    }
    
    await comment.destroy();
    
    // 更新公开信评论数
    letter.decrement("comments", { by: 1 });
    await letter.save();
    
    // 如果是根评论，更新根评论的评论数
    if (comment.root_id) {
      rootComment.decrement("comments", { by: 1 });
      await rootComment.save();
    }

    return {
      msg: getResponseMsg("Comment", "COMMENT_DELETE_SUCCESS", req),
      data: id,
    };
  }
}
