import { createI18n } from "vue-i18n";

import messages from "./getLangs";

export default createI18n({
  legacy: false,
  locale: window.localStorage.getItem("lang") || "zh_CN",
  messages,
});
