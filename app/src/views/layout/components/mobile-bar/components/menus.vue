<template>
  <div :class="`${clsBlockName}`">
    <router-link custom v-for="(v, k) in navItem" :to="v.to" v-slot="{ navigate, isExactActive }">
      <div :class="['mobile-bar-item', { active: isExactActive }]" @click="handleLink(navigate)">
        <component :is="v.icon" class="mobile-bar-icon" size="18" />
        <span class="mobile-bar-title">{{ v.title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { IconHome9Line, IconMailLine, IconEditCircleLine, IconUserSmileLine } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";

const { t } = useI18n();
const navItem = [
  { title: t("route.home"), to: "/", icon: IconHome9Line },
  { title: t("route.public"), to: "/public", icon: IconMailLine },
  { title: t("route.write"), to: "/write", icon: IconEditCircleLine },
  { title: t("route.my"), to: "/test", icon: IconUserSmileLine },
];

const handleLink = (navigate: () => void) => {
  navigate();
  window.scrollTo({ top: 0 });
};
</script>
