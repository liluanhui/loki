<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-menu`">
      <div :class="`${clsBlockName}-menu-list`">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="[`${clsBlockName}-menu-item`, { active: item.type === 'letter' }]"
          @click="$emit('onClick', item)">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
    </div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-header`">
        <div class="uid-block">UID-1184016213</div>
        <div class="edit-btn">
          <bp-button :icon="IconEditLine" type="dashed" size="mini">编辑</bp-button>
        </div>

        <bp-avatar size="large" image-url="https://cos.moya.plus/avatar/avatar_sam.jpg"></bp-avatar>
        <p class="nickname">木亦Sam</p>
        <p class="intro">我们在时间里赶路，而信件是路上埋下的坐标</p>
      </div>
      <!-- <p class="statistic">注册邮局的第 <span>68</span> 天，已成功投递 <span>23</span> 封信件</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconEditLine } from "birdpaper-icon";

defineOptions({ name: "PersonalPage" });
const clsBlockName = "personal-page";

const menuList = [
  {
    title: "个人中心",
    type: "letter",
  },
  {
    title: "我的收藏",
    type: "collection",
  },
  {
    title: "我的草稿",
    type: "draft",
  },
  {
    title: "我的设置",
    type: "setting",
  },
];
</script>
