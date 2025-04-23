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
          <div class="sender-name">
            <span class="sender-name-inner">布鲁是只傻猫</span>
          </div>
        </div>
        <div class="time-ago">1 小时前</div>
      </div>

      <div class="body">
        <div class="letter-to">寄给十年后的自己</div>
        <div class="letter-title">十年后的你，还好吗？</div>
      </div>

      <div class="footer">
        <div class="public-no">
          <span class="public-no-inner">NO.23981001</span>
        </div>
        <div class="statistic">
          <span class="statistic-item"><IconThumbUpLine size="14" />122</span>
          <span class="statistic-item"> <IconChat1Line size="14" />344</span>
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
