import { Injectable } from "@nestjs/common";
import { FpoPublicMailComment } from "src/models/fpo_public_mail_comment.model";
import { PublicLetterCommentSearchParams } from "src/types/publicLetter/comment";

@Injectable()
export class CommentService {
  async queryList(
    offset: number,
    limit: number,
    query: PublicLetterCommentSearchParams,
  ): Promise<{ count: number; list: FpoPublicMailComment[] }> {
    const attributes = ["id"] as string[];

    let { count, rows: list } = await FpoPublicMailComment.findAndCountAll({
      attributes,
      where: {
        mail_id: query.mailId,
      },
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });

    return { count, list: list as unknown as any[] };
  }
}
