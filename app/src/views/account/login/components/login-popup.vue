<template>
  <popup v-model:show="popupShow" position="bottom" :style="{ height: '72%' }" :duration="0.2" round safe-area-inset-bottom @close="close">
    <div class="login-popup"></div>
  </popup>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { Popup } from "vant";
import "vant/lib/popup/style/index";

const props = defineProps({
  title: { type: String, default: "登录邮局，给未来寄封信" },
});
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
