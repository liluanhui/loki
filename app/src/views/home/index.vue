<template>
  <div :class="clsBlockName">
    <banner-block />
    <search-block />

    <div class="quick-start">
      <bp-button :icon="IconQuillPenAiFill" size="large" status="warning" type="dashed" shape="round">{{ t("route.write_btn") }}</bp-button>
    </div>

    <title-bar title="公开信" />
    <div style="width: 1200px; height: 300px; background-color: #fff; border-radius: 16px; margin-bottom: 40px"></div>

    <title-bar title="关注邮局" />
    <social-link />
  </div>
</template>

<script setup lang="ts">
import titleBar from "./components/title-bar.vue";
import { IconQuillPenAiFill } from "birdpaper-icon";
import socialLink from "./components/social-link.vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "HomePage" });
const clsBlockName = "home-page";

const { t } = useI18n();
</script>
