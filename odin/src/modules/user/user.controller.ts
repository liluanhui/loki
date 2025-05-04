import { Controller, Get, Post, Req } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
   // Front 获取当前用户信息
   @Get('current')
   async getUserInfo(@Req() req: Request) {
     const info = await this.userService.findUserInfo(req['uid']);
     return info;
   }
 
   // Back 获取当前管理员信息
   @Get('current/admin')
   async getAdminInfo(@Req() req: Request) {
     const info = await this.userService.findUserInfo(req['uid'], true);
 
     info.permission = await this.userService.getPermissionDetail({
       back_ids: JSON.parse(info.back_auth || '[]'),
     });
 
     delete info.back_auth;
     return info;
   }
}
