import { Injectable } from "@nestjs/common";
import { col, json, literal } from "sequelize";
import { FpoPublicMailComment } from "src/models/fpo_public_mail_comment.model";
import { FpoUser } from "src/models/fpo_user.model";
import { PublicLetterCommentSearchParams } from "src/types/publicLetter/comment";

@Injectable()
export class CommentService {
  /**
   * 查询公开信评论列表
   * @param offset 
   * @param limit 
   * @param param2 
   * @returns 
   */
  async queryList(
    offset: number,
    limit: number,
    { mail_id, root_id }: PublicLetterCommentSearchParams
  ): Promise<{ count: number; list: FpoPublicMailComment[] }> {
    const attributes = [
      "id",
      "uid",
      [col("user.avatar"), "avatar"],
      [col("user.nick_name"), "nick_name"],
      "level",
      "root_id",
      "last_id",
      [literal(`JSON_UNQUOTE(JSON_EXTRACT(ip_region, '$.province'))`), 'province'],
      "content",
      "comments",
      "created_at",
    ] as string[];

    let { count, rows: list } = await FpoPublicMailComment.findAndCountAll({
      attributes,
      where: {
        mail_id: mail_id,
        root_id: root_id || null,
      },
      offset,
      limit,
      order: [["created_at", "DESC"]],
      raw: true,
      include: [{ model: FpoUser, as: "user", attributes: [] }],
    });

    return { count, list: list as unknown as any[] };
  }
}
