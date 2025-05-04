import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { md5Encrypt } from "src/utils/encrypt";
import { Public } from "./auth.decorator";
import { paramsError } from "src/utils/throw";
import { LoginForm, LoginRes } from "src/types/auth";
import { UserService } from "../user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  // 用户登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async doLogin(@Body() LoginForm: LoginForm): Promise<LoginRes> {
    const { uid: account, password } = LoginForm;

    if (!account || !password) {
      paramsError("用户名或密码不能为空");
    }

    const { token, uid } = await this.authService.checkAuthByPassword(account, md5Encrypt(password));
    return { token, uid };
  }
}
