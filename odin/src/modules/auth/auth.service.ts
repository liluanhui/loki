import { Injectable, Dependencies } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { aesEncrypt } from "src/utils/encrypt";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { UserService } from "../user/user.service";
import { businessError, getResponseMsg } from "src/utils/throw";

@Injectable()
@Dependencies(UserService, JwtService, ConfigService, HttpService)
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  /**
   * 通过用户名和密码验证用户
   * @param account
   * @param password
   * @returns Promise<{ token: string; uid: string }>
   */
  async checkAuthByPassword(account: string, password: string, req: Request): Promise<{ token: string; uid: string }> {
    const user = await this.userService.findOne(account);
    if (!user) businessError(getResponseMsg("AuthIndex", "USER_IS_NOT_EXIST", req));

    if (user?.password !== password) businessError(getResponseMsg("AuthIndex", "USERNAME_OR_PSW_IS_ERROR", req));

    return {
      token: await this.genenrateToken({
        uid: user.uid,
        role_id: user.role_id,
      }),
      uid: user.uid,
    };
  }

  /**
   * 生成token
   * @param uid
   * @param nick_name
   * @returns string
   */
  async genenrateToken(payload: any): Promise<string> {
    const t = await this.jwtService.signAsync(payload);
    return aesEncrypt(t, this.configService.get<string>("aes_key"));
  }
}
