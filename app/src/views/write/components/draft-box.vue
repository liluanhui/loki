<template>
  <bp-modal v-model="show" title="草稿箱" :show-border="false">
    <bp-empty />
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "DraftBox" });
const show = ref(false);

const open = () => {
  show.value = true;
};

defineExpose({
  open,
});
</script>
