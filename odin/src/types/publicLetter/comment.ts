export class PublicLetterCommentSearchParams {
  /**
   * 页码
   */
  pageNum: number = 1;
  /**
   * 每页条数
   */
  pageSize: number = 10;
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
  avatar: string;
  comments: number;
  content: string;
  created_at: string;
  id: string;
  last_id: string;
  level: number;
  nick_name: string;
  root_id: string;
  uid: string;
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
