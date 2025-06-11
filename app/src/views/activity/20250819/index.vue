<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-header`">
      <the-logo theme="light" append="@2x" />
    </div>

    <div :class="`${clsBlockName}-banner`">
      <img class="banner-text" src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/activity/20250819/banner-text.png" alt="" />
      <img class="banner-pic" src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/activity/20250819/16-pic.jpg" alt="" />
      <!-- <img src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/activity/20250819/letter-banner@1.5x.png?imageMogr2/thumbnail/!80p" alt="" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const clsBlockName = "activity-20250819";
</script>
