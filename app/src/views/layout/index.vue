<template>
  <div class="app-layout">
    <topBar />
    <appMain />
    <footerBar />

    <mobile-bar />

    <!-- 全局登录弹窗 -->
    <login-modal ref="loginModalRef"></login-modal>
  </div>
</template>

<script setup lang="ts">
import topBar from "./components/top-bar.vue";
import appMain from "./components/app-main.vue";
import footerBar from "./components/footer-bar.vue";
import mobileBar from "./components/mobile-bar.vue";
import { provide } from "vue";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import loginModal from "@/views/account/login/login-modal.vue";

// 全局登录弹窗
const loginModalRef = useRef(loginModal);
provide("account", {
  login: () => loginModalRef.value.open(),
});
</script>
