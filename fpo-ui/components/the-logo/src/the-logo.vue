<template>
  <div :class="clsBlockName">
    <img :class="`${clsBlockName}-img`" src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/logo-text.png" alt="FPO" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "TheLogo" });

const clsBlockName = "the-logo";
</script>
