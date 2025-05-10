<template>
  <bp-modal v-model="modalShow" :title width="660px" hide-footer>
    <login-index type="modal" @success="close"></login-index>

    <div class="login-modal-footer-info">F.P.O | 未来邮局</div>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginIndex from "./index.vue";

const props = defineProps({
  title: { type: String, default: "登录邮局，给未来寄封信" },
  oauthType: { type: String },
  oauthId: { type: String },
});

const modalShow = ref<boolean>(false);

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