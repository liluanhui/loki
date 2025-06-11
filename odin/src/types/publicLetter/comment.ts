export class PublicLetterCommentSearchParams {
  /**
   * 页码
   */
  pageNum: number = 1;
  /**
   * 每页条数
   */
  pageSize: number = 20;
  /**
   * 公开信ID
   */
  mail_id?: string;
  /**
   * 根ID
   */
  root_id?: string;
}

export interface PublicLetterCommentItem {
    avatar: null | string;
    comments: number;
    created_at: string;
    deliver_at: string;
    fpo_no: string;
    id: string;
    likes: number;
    public_type: string;
    recipient_email?: null;
    recipient_name?: null | string;
    recipient_type: string;
    sender_name: string;
    title: string;
    word_count: number;
}

export class PublicLetterCommentForm {
  /**
   * 评论内容
   */
  content: string = "";
  /**
   * 回复ID
   */
  last_id?: string;
  /**
   * 评论层级
   */
  level: number = 0;
  /**
   * 公开信ID
   */
  mail_id: string;
  /**
   * 根ID
   */
  root_id?: string;
}
