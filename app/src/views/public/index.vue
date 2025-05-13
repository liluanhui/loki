<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-header`">
      <radio-bar v-model="current" :option-list="radioBarList"></radio-bar>
      <bp-button :icon="IconRefreshLine" status="gray" type="plain" shape="circle"></bp-button>
    </div>
    <div class="mt-20px">
      <letter-wall />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { IconRefreshLine } from "birdpaper-icon";
import letterWall from "./components/letter-wall.vue";

defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";

const mobileBarCtx: any = inject("mobile-bar");
mobileBarCtx?.change("menu");

const current = ref("new");
const radioBarList = [
  {
    label: "最新",
    value: "new",
  },
  {
    label: "最多点赞",
    value: "like",
  },
  {
    label: "最多评论",
    value: "comment",
  },
];
</script>
