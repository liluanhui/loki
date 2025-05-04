import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FpoPermission } from "src/models/fpo_permission.model";
import { FpoRole } from "src/models/fpo_role.model";
import { FpoRoleGroup } from "src/models/fpo_role_group.model";
import { FpoUser } from "src/models/fpo_user.model";

@Module({
  imports: [SequelizeModule.forFeature([FpoUser, FpoRole, FpoRoleGroup, FpoPermission])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
