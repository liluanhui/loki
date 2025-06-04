<template>
  <login-modal ref="loginModalRef" />
  <login-popup ref="loginPopupRef" />
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import loginModal from "./components/login-modal.vue";
import loginPopup from "./components/login-popup.vue";
import { useRef } from "@loki/fpo-ui/use/useCompRef";

const appMode = useStorage("app-mode", "pc");
const loginModalRef = useRef(loginModal);
const loginPopupRef = useRef(loginPopup);

const open = () => {
  if (appMode.value === "mobile") {
    loginPopupRef.value.open();
    return;
  }
  loginModalRef.value.open();
};

const close = () => {
  if (appMode.value === "mobile") {
    loginPopupRef.value.close();
    return;
  }
  loginModalRef.value.close();
};

defineExpose({
  open,
  close
});
</script>
