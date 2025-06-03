import { get } from "../request/http";
import { StatisticRes } from "@loki/odin/src/types/common";

const namespace = "/common";

// 获取邮局统计数据
export const getStatistic = () => {
  const path = `${namespace}/statistic`;
  return get<StatisticRes>(path);
};
