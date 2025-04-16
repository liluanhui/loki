<template>
  <div :class="clsBlockName">
    <banner-block></banner-block>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "HomePage" });
const clsBlockName = "home-page";
</script>
