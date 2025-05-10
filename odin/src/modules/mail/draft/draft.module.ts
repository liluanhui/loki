import { DraftService } from "./draft.service";
import { DraftController } from "./draft.controller";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FpoMailDraft } from "src/models/fpo_mail_draft.model";

@Module({
  imports: [SequelizeModule.forFeature([FpoMailDraft])],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
