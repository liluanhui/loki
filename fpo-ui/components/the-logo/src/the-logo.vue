<template>
  <div :class="clsBlockName">
    <img
      v-if="onlyIcon"
      :class="`${clsBlockName}-img`"
      src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/logo-icon.png"
      alt="FPO" />
    <img v-else :class="`${clsBlockName}-img`" src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/logo-text.png" alt="FPO" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "TheLogo" });
const clsBlockName = "the-logo";

const props = defineProps({
  onlyIcon: {
    type: Boolean,
    default: false,
  },
});
</script>
