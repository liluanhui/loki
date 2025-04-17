<template>
  <footer :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      footer
    </div>
  </footer>
</template>

<script lang="ts" setup>
defineOptions({ name: "FooterBar" });
const clsBlockName = "footer-bar";
</script>
