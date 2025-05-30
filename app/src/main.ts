import { createApp } from "vue";
import pinia from "./stores/store";

import App from "./App.vue";
import router from "./router";

import "uno.css";
import "@/scss/index.scss";

import BirdpaperUI from "birdpaper-ui";
import "birdpaper-ui/theme/src/index.css";

import BirdpaperIcon from "birdpaper-icon";
import "birdpaper-icon/dist/index.css";

import FpoUI from "@loki/fpo-ui";
import "@loki/fpo-ui/style/index.scss";

import VueWechatTitle from "vue-wechat-title";

import { VueMasonryPlugin } from "vue-masonry";

import i18n from "./locales/i18n";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false, easing: "linear", speed: 200, minimum: 0.2 });

const app = createApp(App);

app.use(router);
app.use(VueWechatTitle);
app.use(BirdpaperIcon);
app.use(BirdpaperUI);
app.use(FpoUI);
app.use(VueMasonryPlugin);
app.use(i18n);
app.use(pinia);
app.use(NProgress);

app.mount("#app");
