import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PublicLetterService } from "./publicletter.service";

@Controller("publicLetter")
export class PublicLetterController {
  constructor(private publicLetterService: PublicLetterService) {}

  // Front 查询公开信列表
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async findList() {}
}
