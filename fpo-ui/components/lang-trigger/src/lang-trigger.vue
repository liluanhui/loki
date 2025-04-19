<template>
  <div :class="clsBlockName">
    <IconTranslate2 size="16" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LangTrigger" });
const clsBlockName = "lang-trigger";
</script>
