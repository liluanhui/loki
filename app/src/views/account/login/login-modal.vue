<template>
  <bp-modal v-model="modalShow" :title width="720px" hide-footer>
    <login-index type="modal" @success="close"></login-index>
    <div class="login-modal-footer-info">F.P.O | 未来邮局</div>
  </bp-modal>

  <popup v-model:show="popupShow" position="bottom" :style="{ height: '72%' }" :duration="0.2" round safe-area-inset-bottom @close="close">
    <div class="login-popup">
      <login-index type="popup" @success="close"></login-index>
    </div>
  </popup>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import loginIndex from "./index.vue";
import { useStorage } from "@vueuse/core";
import { Popup } from "vant";
import "vant/lib/popup/style/index";

const props = defineProps({
  title: { type: String, default: "登录邮局，给未来寄封信" },
  oauthType: { type: String },
  oauthId: { type: String },
});

const appMode = useStorage("app-mode", "pc");

const modalShow = ref<boolean>(false);
const popupShow = ref<boolean>(false);

const mobileBarCtx: any = inject("mobile-bar");
const open = () => {
  if (appMode.value === "mobile") {
    popupShow.value = true;
    mobileBarCtx?.change("loginOption", {
      events: {
        close: () => {
          popupShow.value = false;
          mobileBarCtx?.reset();
        },
      },
    });
    return;
  }
  modalShow.value = true;
};

const close = () => {
  popupShow.value = false;
  modalShow.value = false;
};

defineExpose({
  open,
});
</script>
