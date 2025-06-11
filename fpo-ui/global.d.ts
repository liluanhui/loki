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
    PublicTypeSelector: typeof import("fpo-ui")["PublicTypeSelector"];
    YuqueEditor: typeof import("fpo-ui")["YuqueEditor"];
    LetterDetail: typeof import("fpo-ui")["LetterDetail"];
    CommentList: typeof import("fpo-ui")["CommentList"];
    CommentEditor: typeof import("fpo-ui")["CommentEditor"];
  }
}

export {};
