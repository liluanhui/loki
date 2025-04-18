<template>
  <div :class="clsBlockName">
    {{ title }}
    <div :class="`${clsBlockName}-line`"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "TitleBar" });
const clsBlockName = "title-bar";

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
});
</script>
