<template>
  <div :class="clsBlockName">
    <radio-bar v-model="current" :option-list="radioBarList"></radio-bar>
    <bp-button :icon="IconRefreshLine" status="gray" type="plain" shape="circle"></bp-button>
  </div>
  <div class="mt-20px">
    <div class="public-letter">
      <div class="header">
        <div class="sender-info">
          <bp-avatar size="small" image-url="https://cos.moya.plus/avatar/avatar_sam.jpg"></bp-avatar>
          <div class="sender-name">itsSam</div>
        </div>
        <div class="public-no">
          <span class="public-no-inner">NO.***1001</span>
        </div>
      </div>
      <div class="body"></div>
      <div class="footer">
        <div class="time-ago">1 小时前</div>
        <div class="statistic">
          <IconThumbUpLine size="12" />
          <IconChat1Line size="12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconRefreshLine } from "birdpaper-icon";

defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";

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
