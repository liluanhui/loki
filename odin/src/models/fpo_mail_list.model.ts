import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "fpo_mail_list",
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoMailList extends Model {
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
    type: DataType.ENUM("wait", "cancle", "success", "fail"),
    comment: "投递状态，wait-待投递，cancle-取消投递，success-投递成功，fail-投递失败",
    allowNull: false,
    defaultValue: "wait",
  })
  status: string;

  @Column({
    type: DataType.ENUM("private", "publish"),
    comment: "邮件类型，private-私密，publish-公开",
    allowNull: false,
    defaultValue: "private",
  })
  type: string;

  @Column({
    type: DataType.ENUM("full", "privary", "anonymity"),
    comment: "公开类型，full-完全公开，privary-数据保密，anonymity-匿名",
    allowNull: false,
    defaultValue: "full",
  })
  publich_type: string;

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
    allowNull: true,
  })
  recipient_email: string;

  @Column({
    type: DataType.STRING(30),
    comment: "收件人名称",
    allowNull: true,
  })
  recipient_name: string;

  @Column({
    type: DataType.STRING(11),
    comment: "信件内容ID",
    allowNull: false,
  })
  content_id: string;

  @Column({
    type: DataType.DATE,
    comment: "计划投递时间",
    allowNull: false,
  })
  plan_deliver_at: Date;

  @Column({
    type: DataType.DATE,
    comment: "实际投递时间",
    allowNull: false,
  })
  actual_deliver_at: Date;

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
}
