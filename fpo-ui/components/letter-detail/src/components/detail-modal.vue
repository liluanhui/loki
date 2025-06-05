<template>
  <bp-modal v-model="modalShow" width="1100px" hide-footer hide-header>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

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
