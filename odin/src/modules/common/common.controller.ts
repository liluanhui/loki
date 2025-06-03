import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CommonService } from "./common.service";
import { Public } from "../auth/auth.decorator";
import { StatisticRes } from "src/types/common";

@Controller("common")
export class CommonController {
  constructor(private commonService: CommonService) {}

  // Front 获取邮局统计数据
  @Public()
  @Get("statistic")
  @HttpCode(HttpStatus.OK)
  async getStatistic(): Promise<StatisticRes> {
    const operateTime = this.commonService.getSiteOperationTime();
    const { wait, success } = await this.commonService.getMailCount();

    return { operateTime, wait, success };
  }
}
