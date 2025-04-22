import { Body, Controller, Post, HttpCode, HttpStatus, HttpException, Get, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { generateRSAKeys, md5Encrypt } from "src/utils/encrypt";
import { Public } from "./auth.decorator";
import { paramsError } from "src/utils/throw";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
    // private userService: UserService,
  ) {}

  // 用户登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async doLogin(@Body() LoginForm: any): Promise<any> {}
}
