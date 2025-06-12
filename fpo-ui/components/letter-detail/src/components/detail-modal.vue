<template>
  <bp-modal v-model="modalShow" width="1200px" :title="letterDetail?.title || '--'" hide-footer border-radius="12px" :show-border="false">
    <detail-inner ref="detailInnerRef" v-bind="letterDetail" :loading />
  </bp-modal>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import detailInner from "./detail-inner.vue";
import { getPublicLetterDetail } from "@loki/odin-api/publicLetter";
import { msg } from "../../../fpo-message";
import { useRef } from "../../../../use/useCompRef";

const modalShow = ref<boolean>(false);

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

const open = (id: string) => {
  detailInnerRef.value?.reset();
  modalShow.value = true;
  loadDetail(id);
};

const close = () => {
  modalShow.value = false;
};

watch(modalShow, (val) => {
  if (val) {
    letterDetail.value = null;
  }
});

defineExpose({
  open,
  close,
});
</script>
