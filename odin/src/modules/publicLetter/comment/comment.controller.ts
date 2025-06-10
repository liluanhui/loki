import { Controller, Get, HttpCode, HttpStatus, Query, Req } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Public } from "src/modules/auth/auth.decorator";
import { PublicLetterCommentSearchParams } from "src/types/publicLetter/comment";
import { paramsError } from "src/utils/throw";
import { handlePageLimit } from "src/utils/helper";

@Controller("publicLetter/comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  // Front 获取公开信评论列表
  @Public()
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async findList(@Query() query: PublicLetterCommentSearchParams) {
    const { pageNum, pageSize, mailId } = query;
    if (!pageNum || !pageSize || !mailId) paramsError();

    const { offset, limit } = handlePageLimit(pageNum, pageSize);
    const { count, list } = await this.commentService.queryList(offset, limit, query);

    return { count, list, pageNum: Number(pageNum), pageSize: Number(pageSize) };
  }
}
