<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-header`">
      <the-logo theme="light" append="@2x" />
    </div>

    <div :class="`${clsBlockName}-banner`">
      <img src="https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/activity/20250819/letter-banner@1.5x.png?imageMogr2/thumbnail/!80p" alt="" />
    </div>
    <p v-for="(v, k) in 100">文本内容{{ k }}</p>
  </div>
</template>

<script setup lang="ts">
const clsBlockName = "activity-20250819";
</script>
