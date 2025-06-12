import { Injectable } from "@nestjs/common";
import { col, literal } from "sequelize";
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
    { mail_id, root_id, sort }: PublicLetterCommentSearchParams
  ): Promise<{ count: number; list: FpoPublicMailComment[] }> {
    const attributes = [
      "id",
      "uid",
      [col("user.avatar"), "avatar"],
      [col("user.nick_name"), "nick_name"],
      "level",
      "root_id",
      "last_id",
      [col("last_comment.uid"), "last_uid"],
      [col("last_comment.user.nick_name"), "last_nick_name"],
      [literal(`JSON_UNQUOTE(JSON_EXTRACT(FpoPublicMailComment.ip_region, '$.province'))`), "province"],
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
      order: [["created_at", sort || "DESC"]],
      raw: true,
      include: [
        { model: FpoUser, as: "user", attributes: [] },
        {
          model: FpoPublicMailComment,
          as: "last_comment",
          attributes: [],
          include: [
            {
              model: FpoUser,
              as: "user",
              attributes: [],
              foreignKey: "uid",
            },
          ],
        },
      ],
    });

    return { count, list: list as unknown as any[] };
  }
}
