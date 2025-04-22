<template>
  <div :class="clsBlockName">
    <radio-bar v-model="current" :option-list="radioBarList"></radio-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";

const current = ref("hot");
const radioBarList = [
  {
    label: "推荐",
    value: "hot",
  },
  {
    label: "最新",
    value: "new",
  },
];
</script>
