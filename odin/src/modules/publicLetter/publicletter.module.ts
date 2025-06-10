import { Module } from "@nestjs/common";
import { PublicLetterController } from "./publicletter.controller";
import { PublicLetterService } from "./publicletter.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";
import { FpoPublicMailComment } from "src/models/fpo_public_mail_comment.model";
import { FpoMailContent } from "src/models/fpo_mail_content.model";
import { CommentModule } from "./comment/comment.module";

@Module({
  imports: [CommentModule, SequelizeModule.forFeature([FpoPublicMail, FpoPublicMailComment, FpoMailContent])],
  controllers: [PublicLetterController],
  providers: [PublicLetterService],
})
export class PublicLetterModule {}
