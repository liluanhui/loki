<template>
  <bp-modal
    v-model="modalShow"
    width="1200px"
    title="十年后，去蹦极吧！十年后，去吧！"
    hide-footer
    :show-border="false"
    >
    <detail-inner />
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import detailInner from "./detail-inner.vue";

const { t } = useI18n();
const modalShow = ref<boolean>(false);

const open = (id: string) => {
  modalShow.value = true;
};

const close = () => {
  modalShow.value = false;
};

defineExpose({
  open,
  close,
});
</script>
