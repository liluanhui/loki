import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { FpoUser } from "./fpo_user.model";

@Table({
  tableName: "fpo_public_mail_comment",
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoPublicMailComment extends Model {
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

  @BelongsTo(() => FpoUser, "uid")
  user: FpoUser;

  @Column({
    type: DataType.STRING(11),
    comment: "公开信 ID",
    allowNull: false,
  })
  mail_id: string;

  @Column({
    type: DataType.INTEGER,
    comment: "评论等级",
    allowNull: false,
  })
  level: string;

  @Column({
    type: DataType.STRING(11),
    comment: "父级ID",
    allowNull: true,
  })
  last_id: string;

  @BelongsTo(() => FpoUser, "last_id")
  last_user: FpoUser;

  @Column({
    type: DataType.STRING(11),
    comment: "根ID",
    allowNull: true,
  })
  root_id: string;

  @Column({
    type: DataType.INET(),
    comment: "IP 地址",
    allowNull: false,
  })
  ip_address: string;

  @Column({
    type: DataType.JSON,
    comment: "IP 归属地信息",
    allowNull: true,
  })
  ip_region: string;

  @Column({
    type: DataType.STRING(500),
    comment: "内容",
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
    comment: "评论数",
    allowNull: false,
    defaultValue: 0,
  })
  comments: number;

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
