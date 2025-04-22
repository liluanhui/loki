<template>
  <div :class="clsBlockName">bar</div>
</template>

<script setup lang="ts">
defineOptions({ name: "RadioBar" });
const clsBlockName = "radio-bar";
</script>
