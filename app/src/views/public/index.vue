<template>
  <div :class="clsBlockName">
    <radio-bar></radio-bar>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";
</script>
