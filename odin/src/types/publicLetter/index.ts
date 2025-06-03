export class PublicLetterSearchParams {
  /**
   * 邮件单号
   */
  fpo_no?: string;
  /**
   * 投递结束时间
   */
  endTime?: string;
  /**
   * 页码
   */
  pageNum: number = 1;
  /**
   * 每页条数
   */
  pageSize: number = 20;
  /**
   * 公开类型
   */
  public_type?: string;
  /**
   * 接收人地址/名称
   */
  recipient?: string;
  /**
   * 收件人类型，self-自己，email-邮件地址
   */
  recipient_type?: RecipientType;
  /**
   * 发件人ID/名称
   */
  sender_id?: string;
  /**
   * 排序字段-like、comment、created_at
   */
  sort: Sort = Sort.Created_at;
  /**
   * 投递开始时间
   */
  startTime?: string;
}

/**
 * 收件人类型，self-自己，email-邮件地址
 */
export enum RecipientType {
  Email = "email",
  Self = "self",
}

/**
 * 排序字段-like、comment
 */
export enum Sort {
  Comment = "comment",
  Like = "like",
  Created_at = "created_at",
}
