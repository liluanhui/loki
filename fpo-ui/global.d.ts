declare module "vue" {
  export interface GlobalComponents {
    TheLogo: typeof import("fpo-ui")["TheLogo"];
    BannerBlock: typeof import("fpo-ui")["BannerBlock"];
    SearchBlock: typeof import("fpo-ui")["SearchBlock"];
    ShortcutKey: typeof import("fpo-ui")["ShortcutKey"];
    LangTrigger: typeof import("fpo-ui")["LangTrigger"];
    ThemeTrigger: typeof import("fpo-ui")["ThemeTrigger"];
    RadioBar: typeof import("fpo-ui")["RadioBar"];
    LetterItem: typeof import("fpo-ui")["LetterItem"];
  }
}

export {};
