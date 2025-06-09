<template>
  <popup v-model:show="popupShow" position="bottom" :style="{ height: '100%' }" :duration="0.2" safe-area-inset-bottom @close="close">
  </popup>
</template>

<script setup lang="ts">
import { nextTick, inject, ref, watch } from "vue";
import { getPublicLetterDetail } from "@loki/odin-api/publicLetter";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { msg } from "../../../fpo-message";
import { useRef } from "../../../../use/useCompRef";

const popupShow = ref<boolean>(false);

const loading = ref<boolean>(false);
const letterDetail = ref<any>(null);
const loadDetail = async (id: string) => {
  try {
    loading.value = true;
    const res = await getPublicLetterDetail(id);
    if (res.code !== 0) {
      throw new Error(res.msg);
    }

    letterDetail.value = res.data;
  } catch (err) {
    msg.error((err as Error).message);
  } finally {
    loading.value = false;
  }
};

const mobileBarCtx: any = inject("mobile-bar");
const open = (id: string) => {
  popupShow.value = true;
  mobileBarCtx?.change("publicLetter", {
    events: {
      close,
    },
  });
  loadDetail(id);
};

const close = () => {
  popupShow.value = false;
  mobileBarCtx?.reset();
};

watch(popupShow, (val) => {
  if (val) {
    letterDetail.value = null;
  }
});

defineExpose({
  open,
  close,
});
</script>
