<template>
  <bp-modal v-model="modalShow" width="320px" hide-footer hide-header>
    <login-index type="modal" @success="close"></login-index>
    <div class="login-modal-footer-info">{{ t("common.footer_info") }}</div>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginIndex from "../index.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const modalShow = ref<boolean>(false);

const open = () => {
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
