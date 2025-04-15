import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "uno.css";
import "@/scss/index.scss";

import BirdpaperUI from "birdpaper-ui";
import "birdpaper-ui/theme/src/index.css";

import "@loki/fpo-ui/style/index.scss";

import VueWechatTitle from "vue-wechat-title";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueWechatTitle);
app.use(BirdpaperUI);

app.mount("#app");
