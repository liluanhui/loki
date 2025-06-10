import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FpoPublicMailComment } from "src/models/fpo_public_mail_comment.model";

@Module({
  imports: [SequelizeModule.forFeature([FpoPublicMailComment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
