import { Injectable, Dependencies, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { aesEncrypt } from "src/utils/encrypt";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, map } from "rxjs";
import { col, Op } from "sequelize";
import { randomString } from "src/utils/helper";

@Injectable()
@Dependencies(JwtService, ConfigService, HttpService)
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {}
}
