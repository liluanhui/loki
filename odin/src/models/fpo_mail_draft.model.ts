import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "fpo_mail_draft",
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoMailDraft extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: "主键",
  })
  id: string;

  @Column({
    type: DataType.STRING(11),
    comment: "用户ID",
    allowNull: false,
  })
  uid: string;

  @Column({
    type: DataType.STRING(30),
    comment: "邮件标题",
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    comment: "邮件内容",
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
    comment: "字数",
    allowNull: false,
  })
  word_count: string;

  @Column({
    type: DataType.DATE,
    comment: "删除时间",
    allowNull: false,
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
