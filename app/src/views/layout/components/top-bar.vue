<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <TheLogo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TheLogo } from "@loki/fpo-ui";

defineOptions({ name: "TopBar" });
const clsBlockName = "top-bar";
</script>
