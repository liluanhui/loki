<template>
  <div :class="clsBlockName">
    <img
      v-if="onlyIcon"
      :class="`${clsBlockName}-img`"
      :src="`https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/logo-icon${append}.png?imageMogr2/thumbnail/!80p`"
      alt="FPO" />
    <img
      v-else
      :class="`${clsBlockName}-img`"
      :src="`https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/${logoTextFileName}?imageMogr2/thumbnail/!80p`"
      alt="FPO" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

defineOptions({ name: "TheLogo" });
const clsBlockName = "the-logo";

const props = defineProps({
  onlyIcon: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String as PropType<"light" | "brand">,
    default: "brand",
  },
  append: {
    type: String,
    default: "",
  },
});

const logoTextFileName = computed(() => {
  return props.theme === "brand" ? `logo-text${props.append}.png` : `logo-text-light${props.append}.png`;
});
</script>
