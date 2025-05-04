import { Injectable, Dependencies, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { aesEncrypt } from "src/utils/encrypt";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { UserService } from "../user/user.service";

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
  async checkAuthByPassword(account: string, password: string): Promise<{ token: string; uid: string }> {
    const user = await this.userService.findOne(account);
    if (!user) throw new HttpException("用户不存在", HttpStatus.OK);

    if (user?.password !== password) throw new HttpException("用户名或密码错误", HttpStatus.OK);

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
