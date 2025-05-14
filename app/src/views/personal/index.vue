<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-menu`"></div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-header`">
        <bp-avatar size="large" image-url="https://cos.moya.plus/avatar/avatar_sam.jpg"></bp-avatar>
        <p class="nickname">木亦Sam</p>
        <p class="intro">我们在时间里赶路，而信件是路上埋下的坐标</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PersonalPage" });
const clsBlockName = "personal-page";
</script>
