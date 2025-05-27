import { Injectable } from "@nestjs/common";
import { FpoMailDraft } from "src/models/fpo_mail_draft.model";

@Injectable()
export class DraftService {
  /**
   * 查询草稿列表
   * @param offset
   * @param limit
   * @param query
   * @returns
   */
  async queryList(offset: number, limit: number, query: { uid: string }): Promise<{ count: number; list: any[] }> {
    const attributes = ["id", "type", "title", "word_count", "created_at", "updated_at"];

    let where = { uid: query.uid };
    let { count, rows: list } = await FpoMailDraft.findAndCountAll({
      where,
      attributes,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });

    return { count, list: list as unknown as any[] };
  }
}
