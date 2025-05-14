<template>
  <div class="app-layout">
    <topBar />
    <appMain />
    <footerBar />

    <!-- 移动端导航栏 -->
    <mobile-bar ref="mobileBarRef" :type="mobileBarType" />

    <!-- 全局登录弹窗 -->
    <login-modal ref="loginModalRef"></login-modal>
  </div>
</template>

<script setup lang="ts">
import topBar from "./components/top-bar.vue";
import appMain from "./components/app-main.vue";
import footerBar from "./components/footer-bar.vue";
import mobileBar from "./components/mobile-bar/index.vue";
import { provide, ref } from "vue";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import loginModal from "@/views/account/login/login-modal.vue";

// 全局登录弹窗
const loginModalRef = useRef(loginModal);
provide("account", {
  login: () => loginModalRef.value.open(),
});

// 移动端导航栏
const mobileBarRef = useRef(mobileBar);
const mobileBarType = ref("menu");
provide("mobile-bar", {
  change: (type: string, events: any = null) => {
    mobileBarType.value = type;
    mobileBarRef.value && (mobileBarRef.value.events = events);
  },
});
</script>
