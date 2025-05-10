<template>
  <bp-modal v-model="modalShow" :title width="680px" hide-footer :show-border="false">
    <login-index type="modal" @success="close"></login-index>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginIndex from "./index.vue";

const props = defineProps({
  title: { type: String, default: "登录 - 未来邮局" },
  oauthType: { type: String },
  oauthId: { type: String },
});

const modalShow = ref<boolean>(true);

const open = () => {
  modalShow.value = true;
};

const close = () => {
  modalShow.value = false;
};

defineExpose({
  open,
});
</script>
