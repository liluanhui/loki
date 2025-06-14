<template>
  <popup
    v-model:show="popupShow"
    position="bottom"
    :style="{ height: '100%' }"
    :lock-scroll="false"
    :duration="0.2"
    safe-area-inset-bottom
    @close="close">
    <detail-inner ref="detailInnerRef" is-popup v-bind="letterDetail" :loading />
  </popup>
</template>

<script setup lang="ts">
import { nextTick, inject, ref, watch } from "vue";
import detailInner from "./detail-inner.vue";
import { getPublicLetterDetail } from "@loki/odin-api/publicLetter";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { msg } from "../../../fpo-message";
import { useRef } from "../../../../use/useCompRef";

const popupShow = ref<boolean>(false);

const loading = ref<boolean>(false);
const letterDetail = ref<any>(null);
const detailInnerRef = useRef(detailInner);

const loadDetail = async (id: string) => {
  try {
    loading.value = true;
    const res = await getPublicLetterDetail(id);
    if (res.code !== 0) {
      throw new Error(res.msg);
    }

    letterDetail.value = res.data;
    nextTick(() => {
      detailInnerRef.value?.setContent(letterDetail.value.content);
    });
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
      comment: () => {
        detailInnerRef.value?.showPopupCommentEditor();
      },
    },
  });
  loadDetail(id);
};

const close = () => {
  popupShow.value = false;
  mobileBarCtx?.change("menus");
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
