import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req } from "@nestjs/common";
import { PublicLetterService } from "./publicletter.service";
import { PublicLetterSearchParams } from "src/types/publicLetter";
import { businessError, getResponseMsg, paramsError } from "src/utils/throw";
import { handlePageLimit } from "src/utils/helper";
import { Public } from "../auth/auth.decorator";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";

@Controller("publicLetter")
export class PublicLetterController {
  constructor(private publicLetterService: PublicLetterService) {}

  // Front 获取公开信列表
  @Public()
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async findList(@Query() query: PublicLetterSearchParams, @Req() req: Request) {
    const { pageNum, pageSize } = query;
    if (!pageNum || !pageSize) paramsError();

    const { offset, limit } = handlePageLimit(pageNum, pageSize);
    const { count, list } = await this.publicLetterService.queryList(offset, limit, query, req["uid"]);

    return { count, list, pageNum, pageSize };
  }

  // Front 获取公开信详情
  @Public()
  @Get("detail/:id")
  @HttpCode(HttpStatus.OK)
  async detail(@Param("id") id: string, @Req() req: Request) {
    const letter = await this.publicLetterService.queryDetail(id, req["uid"]);

    if (!letter) {
      businessError(getResponseMsg("PublicLetterIndex", "LETTER_NOT_FOUND", req));
    }

    return letter;
  }

  // Front 获取自己的公开信列表
  @Get("self")
  @HttpCode(HttpStatus.OK)
  async findSelfList(@Query() query: PublicLetterSearchParams, @Req() req: Request) {
    const { pageNum, pageSize } = query;
    if (!pageNum || !pageSize) paramsError();

    const { offset, limit } = handlePageLimit(pageNum, pageSize);
    const { count, list } = await this.publicLetterService.queryList(offset, limit, query, req["uid"], true);

    return { count, list, pageNum, pageSize };
  }

  // Front 删除公开信
  @Post("del")
  @HttpCode(HttpStatus.OK)
  async delete(@Body() body: { id: string }, @Req() req: Request) {
    const { id } = body;
    if (!id) paramsError(getResponseMsg("PublicLetterIndex", "LETTER_NOT_FOUND", req));

    const letter = await FpoPublicMail.findOne({ where: { id, sender_id: req["uid"] } });
    if (!letter) {
      businessError(getResponseMsg("PublicLetterIndex", "LETTER_NOT_FOUND", req));
    }

    await letter.destroy();

    return {
      data: id,
      msg: getResponseMsg("PublicLetterIndex", "LETTER_DELETE_SUCCESS", req),
    };
  }
}
