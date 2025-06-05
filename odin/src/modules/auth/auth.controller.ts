import { Body, Controller, Post, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { md5Encrypt } from "src/utils/encrypt";
import { Public } from "./auth.decorator";
import { getResponseMsg, paramsError } from "src/utils/throw";
import { LoginForm, LoginRes } from "src/types/auth";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // 用户登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async doLogin(@Body() LoginForm: LoginForm, @Req() req: Request): Promise<LoginRes> {
    const { uid: account, password } = LoginForm;

    if (!account || !password) {
      paramsError(getResponseMsg("AuthIndex", "USERNAME_OR_PSW_IS_EMPTY", req));
    }

    const { token, uid } = await this.authService.checkAuthByPassword(account, md5Encrypt(password), req);
    return { token, uid };
  }
}
