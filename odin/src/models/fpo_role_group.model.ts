import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'fpo_role_group',
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class FpoRoleGroup extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: '主键',
  })
  id: string;

  @Column({
    type: DataType.STRING(40),
    comment: '分组名称',
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    comment: '创建时间',
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    comment: '更新时间',
  })
  updated_at: Date;
}
