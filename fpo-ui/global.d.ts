declare module "vue" {
  export interface GlobalComponents {
    TheLogo: typeof import("fpo-ui")["TheLogo"];
    BannerBlock: typeof import("fpo-ui")["BannerBlock"];
  }
}

export {};
