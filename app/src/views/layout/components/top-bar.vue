<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`"></div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "TopBar" });
const clsBlockName = "top-bar";
</script>
