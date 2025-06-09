<template>
  <detail-modal ref="detailModalRef" />
  <detail-popup ref="detailPopupRef" />
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import detailModal from "./components/detail-modal.vue";
import detailPopup from "./components/detail-popup.vue";
import { useRef } from "../../../use/useCompRef";

defineOptions({ name: "LetterDetail" });
const clsBlockName = "letter-detail";

const appMode = useStorage("app-mode", "pc");
const detailModalRef = useRef(detailModal);
const detailPopupRef = useRef(detailPopup);

const open = (id: string) => {
  if (appMode.value === "mobile") {
    detailPopupRef.value.open(id);
    return;
  }
  detailModalRef.value.open(id);
};

const close = () => {
  if (appMode.value === "mobile") {
    detailPopupRef.value.close();
    return;
  }
  detailModalRef.value.close();
};

defineExpose({
  open,
  close,
});
</script>
