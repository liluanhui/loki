<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-item`" v-for="v in list">
      <img :class="`${clsBlockName}-img`" :src="v.img" :alt="v.title" />
      <div :class="`${clsBlockName}-info`">
        <div :class="`${clsBlockName}-info-title`">{{ v.title }}</div>
        <div :class="`${clsBlockName}-info-desc`">{{ v.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "SocialLink" });
const clsBlockName = "social-link";

const list: any[] = [
  { title: "小红书", desc: "搜索：木亦MOYA", img: "https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/redbook@2x.png" },
  { title: "MOYA", desc: "作者个人博客", img: "https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/moya@2x.png" },
  { title: "抖音", desc: "搜索：木亦MOYA", img: "https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/douyin@2x.png" },
  { title: "视频号", desc: "搜索：木亦MOYA", img: "https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/shipinhao@2x.png" },
  { title: "公众号", desc: "搜索：木亦MOYA", img: "https://fpo-1251999712.cos.ap-guangzhou.myqcloud.com/logo/mp@2x.png" },
];
</script>
