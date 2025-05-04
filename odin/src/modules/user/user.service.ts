import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { FpoUser } from "src/models/fpo_user.model";

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
}
