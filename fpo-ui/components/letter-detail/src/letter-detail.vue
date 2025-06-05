<template>
  <detail-modal ref="detailModalRef" />
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import detailModal from "./components/detail-modal.vue";
import { useRef } from "use/useCompRef";

defineOptions({ name: "LetterDetail" });
const clsBlockName = "letter-detail";

const appMode = useStorage("app-mode", "pc");
const detailModalRef = useRef(detailModal);

const open = (id: string) => {
  if (appMode.value === "mobile") {
    return;
  }
  detailModalRef.value.open(id);
};

const close = () => {
  if (appMode.value === "mobile") {
    return;
  }
  detailModalRef.value.close();
};

defineExpose({
  open,
  close,
});
</script>
