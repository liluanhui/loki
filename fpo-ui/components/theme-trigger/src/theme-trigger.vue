<template>
  <div :class="clsBlockName">
    <IconSunLine size="16" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ThemeTrigger" });
const clsBlockName = "theme-trigger";
</script>
