import { DraftService } from "./draft.service";
import { DraftController } from "./draft.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
