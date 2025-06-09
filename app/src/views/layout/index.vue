<template>
  <div class="app-layout">
    <topBar />
    <appMain />
    <footerBar />

    <!-- 移动端导航栏 -->
    <mobile-bar ref="mobileBarRef" :type="mobileBarType" />

    <!-- 全局登录弹窗 -->
    <app-login ref="appLoginRef"></app-login>
  </div>
</template>

<script setup lang="ts">
import topBar from "./components/top-bar.vue";
import appMain from "./components/app-main.vue";
import footerBar from "./components/footer-bar.vue";
import mobileBar from "./components/mobile-bar/index.vue";
import { nextTick, provide, ref, watch } from "vue";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import appLogin from "@/views/account/login/app-login.vue";
import { useStorage, useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const appMode = useStorage("app-mode", "pc");

watch(
  () => width.value,
  (newWidth) => {
    nextTick(()=>{
      if (newWidth > 1200) {
        appMode.value = "pc";
      } else if (newWidth <= 1200 && newWidth > 766) {
        appMode.value = "tablet";
      } else {
        appMode.value = "mobile";
      }
    })
  },
  { immediate: true }
);

// 全局登录弹窗
const appLoginRef = useRef(appLogin);
provide("account", {
  login: () => appLoginRef.value.open(),
});

// 移动端导航栏
const mobileBarRef = useRef(mobileBar);
const mobileBarType = ref("menu");
const lastMobileBar = ref({
  type: "menu",
  events: null,
  props: {},
});
provide("mobile-bar", {
  change: (type: string, data: { events: any; props?: any } = { events: null, props: {} }) => {
    lastMobileBar.value.type = mobileBarType.value;
    lastMobileBar.value.events = mobileBarRef.value?._events || null;
    lastMobileBar.value.props = mobileBarRef.value?._props || {};

    mobileBarType.value = type;

    if (mobileBarRef.value) {
      mobileBarRef.value._events = data.events;
      mobileBarRef.value._props = data.props;
    }
  },
  reset: () => {
    mobileBarType.value = lastMobileBar.value.type;
    if (mobileBarRef.value) {
      mobileBarRef.value._events = lastMobileBar.value.events;
      mobileBarRef.value._props = lastMobileBar.value.props;
    }
  },
});
</script>
