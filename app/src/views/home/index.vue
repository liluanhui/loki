<template>
  <div :class="clsBlockName">
    <banner-block />
    <search-block />

    <div class="quick-start">
      <bp-button :icon="IconQuillPenAiFill" size="large" status="warning" type="dashed" shape="round">{{ t("route.write_btn") }}</bp-button>
    </div>

    <title-bar title="公开信" />
    <div class="public-letter-area">
      <div class="public-letter-area-inner">
        <letter-item v-for="(item, index) in 8" :key="item" />
      </div>
      <div class="public-letter-area-option">
        <IconMore2Fill />
        <bp-button size="large" type="dashed" shape="round">查看更多</bp-button>
      </div>
    </div>

    <title-bar title="关注邮局" />
    <div class="social-link-area">
      <social-link />
    </div>
  </div>
</template>

<script setup lang="ts">
import titleBar from "./components/title-bar.vue";
import { IconQuillPenAiFill } from "birdpaper-icon";
import socialLink from "./components/social-link.vue";
import { useI18n } from "vue-i18n";
import { inject } from "vue";

defineOptions({ name: "HomePage" });
const clsBlockName = "home-page";

const mobileBarCtx: any = inject("mobile-bar");
mobileBarCtx?.change("menu");

const { t } = useI18n();
</script>
