import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { Module } from "@nestjs/common";
import { DraftModule } from "./draft/draft.module";

@Module({
  imports: [
    DraftModule
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
