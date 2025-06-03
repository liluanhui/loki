import { Controller, Get, HttpCode, HttpStatus, Query, Req } from "@nestjs/common";
import { PublicLetterService } from "./publicletter.service";
import { PublicLetterSearchParams } from "src/types/publicLetter";
import { paramsError } from "src/utils/throw";
import { handlePageLimit } from "src/utils/helper";
import { Public } from "../auth/auth.decorator";

@Controller("publicLetter")
export class PublicLetterController {
  constructor(private publicLetterService: PublicLetterService) {}

  // Front 查询公开信列表
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
}
