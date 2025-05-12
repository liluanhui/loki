<template>
  <div :class="clsBlockName" style="justify-content: space-between">
    <bp-link :icon="IconArrowGoBackLine" style="margin-left: 6px">返回</bp-link>

    <div :class="`${clsBlockName}-btn-group`">
      <bp-button :icon="IconDraftLine" type="text" shape="round">{{ t("write.editor.draft_text") }}</bp-button>
      <bp-button :icon="IconSendPlaneFill" type="plain" shape="round">{{ t("write.editor.send_text") }}</bp-button>
    </div>
    <!-- <bp-button size="small" type="text">返回</bp-button> -->

    <!-- <router-link custom v-for="(v, k) in navItem" :to="v.to" v-slot="{ navigate, isExactActive }">
      <div :class="['mobile-bar-item', { active: isExactActive }]" @click="handleLink(navigate)">
        <component :is="v.icon" class="mobile-bar-icon" size="18" />
        <span class="mobile-bar-inner">{{ v.title }}</span>
      </div>
    </router-link> -->
  </div>
</template>

<script lang="ts" setup>
import {
  IconHome9Line,
  IconMailLine,
  IconEditCircleLine,
  IconUserSmileLine,
  IconSendPlaneFill,
  IconDraftLine,
  IconArrowGoBackLine,
} from "birdpaper-icon";
import { provide } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ name: "MobileBar" });
const clsBlockName = "mobile-bar";
const { t } = useI18n();

provide("mobile-bar", {});

const navItem = [
  {
    title: t("route.home"),
    to: "/",
    icon: IconHome9Line,
  },
  {
    title: t("route.public"),
    to: "/public",
    icon: IconMailLine,
  },
  {
    title: t("route.write"),
    to: "/write",
    icon: IconEditCircleLine,
  },
  {
    title: t("route.my"),
    to: "/test",
    icon: IconUserSmileLine,
  },
];
const handleLink = (navigate: () => void) => {
  navigate();
  window.scrollTo({ top: 0 });
};
</script>
