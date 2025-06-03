import { Injectable } from "@nestjs/common";
import { FpoMailList } from "src/models/fpo_mail_list.model";

@Injectable()
export class CommonService {
  /**
   * @returns The number of days the site has been operational since August 19, 2025.
   * This method calculates the difference in time between the current date and the start date,
   */
  getSiteOperationTime() {
    const startTime = new Date("2025-08-19");
    const currentTime = new Date();
    const diffTime = currentTime.getTime() - startTime.getTime();

    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Retrieves the count of mail items based on their status.
   * @returns 
   */
  async getMailCount() {
    const [wait, success] = await Promise.all([
      FpoMailList.count({ where: { status: "wait" } }),
      FpoMailList.count({ where: { status: "success" } }),
    ]);
    return { wait, success };
  }
}
