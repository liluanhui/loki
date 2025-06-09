import { Injectable } from "@nestjs/common";
import { col, Op } from "sequelize";
import { FpoMailContent } from "src/models/fpo_mail_content.model";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";
import { FpoUser } from "src/models/fpo_user.model";
import { PublicLetterSearchParams } from "src/types/publicLetter";

@Injectable()
export class PublicLetterService {
  /**
   * 查询公开信列表
   * @param offset
   * @param limit
   * @param query
   * @param uid
   * @returns
   */
  async queryList(
    offset: number,
    limit: number,
    query: PublicLetterSearchParams,
    uid?: string,
    isSelf: boolean = false
  ): Promise<{ count: number; list: FpoPublicMail[] }> {
    const attributes = [
      "id",
      "fpo_no",
      "public_type",
      "sender_name",
      "recipient_type",
      "recipient_email",
      "content_id",
      [col("content.title"), "title"],
      [col("content.word_count"), "word_count"],
      "deliver_at",
      "comments",
      "likes",
      "created_at",
    ] as string[];

    let where = query.recipient
      ? {
          [Op.or]: [{ recipient_email: query.recipient }, { recipient_name: { [Op.like]: `%${query.recipient}%` } }],
        }
      : {};
    if (query.public_type) where["public_type"] = query.public_type;
    if (query.fpo_no) where["fpo_no"] = { [Op.in]: query.fpo_no.split(",") };
    if (query.recipient_type) where["recipient_type"] = query.recipient_type;
    if (query.sender_id || isSelf) where["sender_Id"] = isSelf ? uid : query.sender_id;
    if (query.startTime && query.endTime) {
      where["deliver_at"] = { [Op.between]: [query.startTime, query.endTime] };
    }

    let { count, rows: list } = await FpoPublicMail.findAndCountAll({
      where,
      attributes,
      offset,
      limit,
      order: [[query.sort || "created_at", "ASC"]],
      raw: true,
      include: [{ model: FpoMailContent, as: "content", attributes: [] }],
    });

    // TODO uid 评论点赞处理

    return { count, list: list as unknown as any[] };
  }

  /**
   * 查询公开信详情
   * @param id
   * @param uid
   * @returns
   */
  async queryDetail(id: string, uid?: string): Promise<FpoPublicMail> {
    const letter = await FpoPublicMail.findOne({
      where: { id },
      attributes: [
        "id",
        "fpo_no",
        "public_type",
        "sender_name",
        "recipient_type",
        "recipient_name",
        "public_type",
        [col("content.title"), "title"],
        [col("content.content"), "content"],
        [col("content.word_count"), "word_count"],
        [col("sender.avatar"), "avatar"],
        "deliver_at",
        "comments",
        "likes",
        "created_at",
      ],
      include: [
        { model: FpoMailContent, as: "content", attributes: [] },
        { model: FpoUser, as: "sender", attributes: [] },
      ],
      raw: true,
    });

    // TODO uid 评论点赞处理

    if (!letter) return null;

    // 处理公开类型
    switch (letter.public_type) {
      case "privary":
        letter.recipient_name = letter.recipient_name?.replace(/(.{1})(.*)/, "$1**");
        letter.sender_name = letter.sender_name.slice(0, 1) + "**";
        break;
      case "anonymity":
        letter.avatar = "";
        letter.recipient_name = "***";
        letter.sender_name = "***";
        break;
    }

    return letter;
  }
}
