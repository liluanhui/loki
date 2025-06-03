import { SequelizeModule } from "@nestjs/sequelize";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";
import { Module } from "@nestjs/common";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";
import { FpoMailList } from "src/models/fpo_mail_list.model";

@Module({
  imports: [SequelizeModule.forFeature([FpoPublicMail, FpoMailList])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
