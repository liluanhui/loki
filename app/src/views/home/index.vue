<template>
  <div :class="clsBlockName">
    <!-- <banner-block />
    <search-block />

    <div class="quick-start">
      <bp-button :icon="IconQuillPenAiFill" size="large" status="warning" type="dashed" shape="round">写一封信</bp-button>
    </div>

    <title-bar title="公开信" />
    <div style="width: 1200px; height: 300px; background-color: #fff; border-radius: 16px; margin-bottom: 40px"></div>
    
    <title-bar title="关注邮局" />
    <div style="width: 1200px; height: 120px; background-color: #fff; border-radius: 16px; margin-bottom: 40px"></div> -->
  </div>
</template>

<script setup lang="ts">
import titleBar from "./components/title-bar.vue";
import { IconQuillPenAiFill } from "birdpaper-icon";

defineOptions({ name: "HomePage" });
const clsBlockName = "home-page";
</script>
