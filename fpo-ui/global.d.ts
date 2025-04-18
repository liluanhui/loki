declare module "vue" {
  export interface GlobalComponents {
    TheLogo: typeof import("fpo-ui")["TheLogo"];
    BannerBlock: typeof import("fpo-ui")["BannerBlock"];
    SearchBlock: typeof import("fpo-ui")["SearchBlock"];
    ShortcutKey: typeof import("fpo-ui")["ShortcutKey"];
  }
}

export {};
