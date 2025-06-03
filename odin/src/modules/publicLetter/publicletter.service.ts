import { Injectable } from "@nestjs/common";
import { FpoPublicMail } from "src/models/fpo_public_mail.model";
import { PublicLetterSearchParams } from "src/types/publicLetter";

@Injectable()
export class PublicLetterService {
  async queryList(offset: number, limit: number, query: PublicLetterSearchParams, uid: string): Promise<{ count: number; list: any[] }> {
    const attributes = [
      "id",
      "fpo_no",
      "public_type",
      "sender_name",
      "recipient_type",
      "recipient_email",
      "content_id",
      "deliver_at",
      "comments",
      "created_at",
    ];

    let where = {};
    if (query.public_type) where["public_type"] = query.public_type;
    if (query.recipient_type) where["recipient_type"] = query.recipient_type;
    if (query.sender_id) where["sender_Id"] = query.sender_id;
    if (query.recipient) where["recipient"] = `%${query.recipient}%`;

    let { count, rows: list } = await FpoPublicMail.findAndCountAll({
      where,
      attributes,
      offset,
      limit,
      order: [[query.sort, "DESC"]],
    });

    return { count, list: list as unknown as any[] };
  }
}
