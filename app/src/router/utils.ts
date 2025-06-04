import { useStorage } from "@vueuse/core";

const currentLang = useStorage("lang", "zh_CN");
export const siteTitle = {
  zh_CN: "未来邮局",
  en: "Feature Post Office.",
};

export const routeName = {
  zh_CN: {
    home: "首页",
    public: "公开信",
    write: "写信",
    tool: "工具箱",
    about: "关于",
    personal: "个人中心",
    activity: "活动",
    mzzx20250819: "来自十年前的信｜梅州中学2015届16班",
  },
  en: {
    home: "Home",
    public: "Public Letter",
    write: "Write",
    tool: "Toolbox",
    about: "About",
    personal: "Personal Center",
    activity: "Activity",
    mzzx20250819: "The letter from Ten Years Ago | Meizhou Middle School Class 16, 2015",
  },
};

// 动态生成 meta.title 的工具函数
export const generateTitle = (key: string) => {
  return `${routeName[currentLang.value][key]} | ${siteTitle[currentLang.value]}`;
};
