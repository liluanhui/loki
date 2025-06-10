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
