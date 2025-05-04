import { Injectable } from "@nestjs/common";
import { col, Op } from "sequelize";
import { FpoPermission } from "src/models/fpo_permission.model";
import { FpoRole } from "src/models/fpo_role.model";
import { FpoUser } from "src/models/fpo_user.model";
import { decryptString, hideEmail } from "src/utils/encrypt";
import { businessError } from "src/utils/throw";

@Injectable()
export class UserService {
  /**
   * 查询单个用户
   * @param account 可以是uid、email、phone
   * @returns User | undefined
   */
  async findOne(account: string): Promise<FpoUser | undefined> {
    return FpoUser.findOne({
      where: {
        [Op.or]: [{ uid: account }, { email: account }, { phone: account }],
      },
    });
  }

  /**
   * 查询用户信息
   * @param account
   * @param isAdmin
   * @returns
   */
  async findUserInfo(account: string, isAdmin: boolean = false): Promise<any> {
    const query = {
      [Op.or]: [{ uid: account }, { email: account }, { phone: account }],
    };
    const authType = isAdmin ? [[col("fpo_role.back_auth"), "back_auth"]] : [];
    const decryptAttrList = ["email", "phone"]; // 需要处理的敏感字段

    let userAttr = [
      "uid",
      "role_id",
      "nick_name",
      "avatar",
      "sex",
      "email_status",
      "intro",
      "created_at",
      [col("fpo_role.name"), "role_name"],
    ]
      .concat(decryptAttrList)
      .concat(authType); // 需要取出的用户相关字段

    const userInfo = await FpoUser.findOne({
      where: query,
      attributes: userAttr as string[],
      raw: true,
      include: [{ model: FpoRole, as: "fpo_role", attributes: [] }],
    });

    if (!userInfo) {
      businessError("用户信息不存在");
    }

    userInfo.phone = decryptString(userInfo.phone, 6);
    userInfo.email = hideEmail(userInfo.email);

    return userInfo;
  }

  /**
   * 获取用户权限详情
   * @param param
   * @returns
   */
  async getPermissionDetail({ back_ids }: { back_ids?: string[] }) {
    const attributes = {
      exclude: ["created_at", "updated_at", "api_path", "remark"],
    };

    const perm = back_ids ? { b: [] } : { f: [], m: [] };
    const idsObj = {
      b: back_ids || [],
    };

    for (const key in perm) {
      if (idsObj[key].length === 0) {
        perm[key] = [];
        continue;
      }
      perm[key] = await FpoPermission.findAll({
        where: { id: { [Op.or]: idsObj[key] } },
        attributes,
      });
    }

    return perm;
  }
}
