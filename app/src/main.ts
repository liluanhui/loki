import { createApp } from "vue";
import { createPinia } from "pinia";

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

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueWechatTitle);
app.use(BirdpaperIcon);
app.use(BirdpaperUI);
app.use(FpoUI);
app.use(VueMasonryPlugin);
app.use(i18n);

app.mount("#app");
