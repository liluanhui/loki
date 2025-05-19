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
        <div class="uid-block">UID-{{ userInfo.uid }}</div>
        <div class="edit-btn">
          <bp-button :icon="IconEditLine" type="text" size="mini">编辑</bp-button>
        </div>

        <bp-avatar size="large" :image-url="userInfo.avatar"></bp-avatar>
        <p class="nickname">{{ userInfo.nick_name }}</p>
        <p class="intro">{{ userInfo.intro || '用户比较神秘，什么也没留下' }}</p>
      </div>
      <!-- <p class="statistic">注册邮局的第 <span>68</span> 天，已成功投递 <span>23</span> 封信件</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconEditLine } from "birdpaper-icon";
import { useUserStore } from "@/stores/useUser";

defineOptions({ name: "PersonalPage" });
const clsBlockName = "personal-page";
const { userInfo } = useUserStore();

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
