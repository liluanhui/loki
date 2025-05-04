import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { FpoRoleGroup } from "./fpo_role_group.model";

@Table({
  tableName: "fpo_role",
  paranoid: false,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class FpoRole extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: "ID",
  })
  id: string;

  @Column({
    type: DataType.STRING(11),
    comment: "分组ID",
    allowNull: false,
  })
  group_id: string;

  @Column({
    type: DataType.STRING(20),
    comment: "角色名称",
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    comment: "后台权限组",
    allowNull: true,
  })
  back_auth: string;

  @Column({
    type: DataType.ENUM("on", "off"),
    comment: "状态，on-启用，off-禁用",
    allowNull: false,
    defaultValue: "on",
  })
  status: string;

  @Column({
    type: DataType.STRING(255),
    comment: "备注",
    allowNull: true,
  })
  remark: string;

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

  @BelongsTo(() => FpoRoleGroup, {
    foreignKey: "group_id",
    targetKey: "id",
    as: "fpo_role_group",
  })
  moya_role_group: FpoRoleGroup;
}
