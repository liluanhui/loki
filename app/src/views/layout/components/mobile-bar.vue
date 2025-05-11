<template>
  <div :class="clsBlockName">
    <router-link custom v-for="(v, k) in navItem" :to="v.to" v-slot="{ navigate, isExactActive }">
      <div :class="['mobile-bar-item', { active: isExactActive }]" @click="navigate">
        <component :is="v.icon" class="mobile-bar-icon" size="18" />
        <span class="mobile-bar-inner">{{ v.title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { IconHome9Line, IconMailLine, IconEditCircleLine, IconUserSmileLine } from "birdpaper-icon";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

defineOptions({ name: "MobileBar" });
const clsBlockName = "mobile-bar";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const { t } = useI18n();

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
    to: "/write",
    icon: IconUserSmileLine,
  },
];
</script>
