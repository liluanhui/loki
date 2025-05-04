import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'fpo_permission',
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class FpoPermission extends Model {
  @Column({
    type: DataType.STRING(11),
    primaryKey: true,
    comment: '权限ID',
  })
  id: string;

  @Column({
    type: DataType.STRING(20),
    comment: '标题',
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(60),
    comment: '标识',
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM('module', 'page', 'perm', 'sensitize'),
    comment: '类型，module-模块，page-页面，perm-功能按钮，sensitize-敏感数据',
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING(11),
    comment: '父级ID',
    allowNull: true,
  })
  parent_id: string;

  @Column({
    type: DataType.STRING(60),
    comment: '路径',
    allowNull: false,
  })
  path: string;

  @Column({
    type: DataType.STRING(60),
    comment: 'API路径',
    allowNull: false,
  })
  api_path: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否在菜单展示，0-不展示，1-展示',
    allowNull: false,
    defaultValue: 0,
  })
  show_in_menu: number;

  @Column({
    type: DataType.INTEGER,
    comment: '页面是否缓存，0-不缓存，1-缓存',
    allowNull: false,
    defaultValue: 0,
  })
  is_cache: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否需要鉴权，0-不需要，1-需要',
    allowNull: false,
    defaultValue: 0,
  })
  is_auth: number;

  @Column({
    type: DataType.STRING(40),
    comment: '图标',
    allowNull: true,
  })
  icon: string;

  @Column({
    type: DataType.INTEGER,
    comment: '排序值',
    allowNull: true,
    defaultValue: 0,
  })
  sort: number;

  @Column({
    type: DataType.STRING(255),
    comment: '备注',
    allowNull: false,
  })
  remark: string;

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
