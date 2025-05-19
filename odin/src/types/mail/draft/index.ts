export class DraftForm {
  id?: string;
  /**
   * 邮件内容
   */
  content: string = "";
  /**
   * 计划投递时间
   */
  plan_deliver_at: string = "";
  /**
   * 公开类型，full-完全公开，privary-数据保密，anonymity-匿名
   */
  public_type?: PublicType = PublicType.Full;
  /**
   * 收件人邮箱地址
   */
  recipient_email?: string;
  /**
   * 收件人名称
   */
  recipient_name?: string;
  /**
   * 收件人类型，self-自己，email-邮件地址
   */
  recipient_type: RecipientType = RecipientType.Self;
  /**
   * 邮件标题
   */
  title: string = "";
  /**
   * 邮件类型，private-私密，public-公开
   */
  type: Type = Type.Private;
  /**
   * 字数
   */
  word_count: number;
}

/**
 * 公开类型，full-完全公开，privary-数据保密，anonymity-匿名
 */
export enum PublicType {
  Anonymity = "anonymity",
  Full = "full",
  Privary = "privary",
}

/**
 * 收件人类型，self-自己，email-邮件地址
 */
export enum RecipientType {
  Email = "email",
  Self = "self",
}

/**
 * 邮件类型，private-私密，public-公开
 */
export enum Type {
  Private = "private",
  public = "public",
}
