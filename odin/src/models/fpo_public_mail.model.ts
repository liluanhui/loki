import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { FpoMailContent } from "./fpo_mail_content.model";
import { FpoUser } from "./fpo_user.model";

@Table({
  tableName: "fpo_public_mail",
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoPublicMail extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: "主键",
  })
  id: string;

  @Column({
    type: DataType.STRING(20),
    comment: "邮件单号",
    allowNull: false,
  })
  fpo_no: string;

  @Column({
    type: DataType.ENUM("full", "privary", "anonymity"),
    comment: "公开类型，full-完全公开，privary-数据保密，anonymity-匿名",
    allowNull: false,
    defaultValue: "full",
  })
  public_type: string;

  @Column({
    type: DataType.STRING(11),
    comment: "发件人ID",
    allowNull: false,
  })
  sender_id: string;

  @Column({
    type: DataType.STRING(30),
    comment: "发件人名称",
    allowNull: false,
  })
  sender_name: string;

  @BelongsTo(() => FpoUser, 'sender_id')
  sender: FpoUser;

  @Column({
    type: DataType.ENUM("self", "email"),
    comment: "收件人类型，self-自己，email-邮件地址",
    allowNull: false,
    defaultValue: "self",
  })
  recipient_type: string;

  @Column({
    type: DataType.STRING(40),
    comment: "收件人邮箱地址",
    allowNull: false,
  })
  recipient_email: string;

  @Column({
    type: DataType.STRING(30),
    comment: "收件人名称",
    allowNull: false,
  })
  recipient_name: string;

  @Column({
    type: DataType.STRING(11),
    comment: "信件内容ID",
    allowNull: false,
  })
  content_id: string;

  @BelongsTo(() => FpoMailContent, 'content_id')
  content: FpoMailContent;

  @Column({
    type: DataType.DATE,
    comment: "投递时间",
    allowNull: false,
  })
  deliver_at: Date;

  @Column({
    type: DataType.INTEGER,
    comment: "评论数",
    allowNull: false,
  })
  comments: number;

  @Column({
    type: DataType.INTEGER,
    comment: "点赞数",
    allowNull: false,
  })
  likes: number;

  @Column({
    type: DataType.DATE,
    comment: "删除时间",
  })
  deleted_at: Date;

  @Column({
    type: DataType.DATE,
    comment: "创建时间",
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    comment: "更新时间",
  })
  updated_at: Date;
  avatar: string;
}
