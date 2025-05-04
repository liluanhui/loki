import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { FpoRole } from "./fpo_role.model";

@Table({
  tableName: "fpo_user",
  paranoid: false,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoUser extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: "用户ID",
  })
  uid: string;

  @Column({
    type: DataType.STRING(11),
    comment: "角色ID",
    allowNull: false,
  })
  role_id: string;

  @Column({
    type: DataType.STRING(40),
    comment: "邮箱地址",
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM("check", "uncheck"),
    comment: "邮箱状态：check 正常，uncheck-未验证",
    allowNull: false,
    defaultValue: "uncheck",
  })
  email_status: string;

  @Column({
    type: DataType.STRING(11),
    comment: "手机号",
  })
  phone: string;

  @Column({
    type: DataType.STRING(10),
    comment: "昵称",
    allowNull: false,
  })
  nick_name: string;

  @Column({
    type: DataType.STRING(255),
    comment: "密码",
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(255),
    comment: "头像",
    allowNull: true,
  })
  avatar: string;

  @Column({
    type: DataType.ENUM("man", "women", "unknown"),
    comment: "性别",
    allowNull: false,
    defaultValue: "unknown",
  })
  sex: string;

  @Column({
    type: DataType.STRING(100),
    comment: "介绍",
    allowNull: true,
  })
  intro: string;

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

  @BelongsTo(() => FpoRole, {
    foreignKey: "role_id",
    targetKey: "id",
    as: "fpo_role",
  })
  fpo_role: FpoRole;
}
