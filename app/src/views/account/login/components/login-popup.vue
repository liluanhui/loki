<template>
  <popup v-model:show="popupShow" position="bottom" :style="{ height: '82%' }" :duration="0.2" round
    safe-area-inset-bottom @close="close">
    <div :class="clsBlockName">
      <login-index type="popup" @success="close"></login-index>
    </div>
  </popup>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import loginIndex from "../index.vue";

const clsBlockName = "login-popup";
const popupShow = ref<boolean>(false);

const mobileBarCtx: any = inject("mobile-bar");
const open = () => {
  popupShow.value = true;
  popupShow.value = true;
  mobileBarCtx?.change("loginOption", {
    events: {
      close,
    },
  });
};

const close = () => {
  popupShow.value = false;
  mobileBarCtx?.reset();
};

defineExpose({
  open,
  close,
});
</script>
