<template>
  <div :class="clsBlockName">
    <transition name="slide-up-down" mode="out-in">
      <div v-if="type === 'write'" :class="`${clsBlockName}-inner`">
        <bp-link :icon="IconArrowGoBackLine" style="margin-left: 6px" @click="goBack">{{ t("common.back") }}</bp-link>
        <div :class="`${clsBlockName}-btn-group`">
          <bp-link :icon="IconSaveLine">{{ t("write.editor.draft_text") }}</bp-link>
          <bp-button :icon="IconSendPlaneFill" type="plain" shape="round">{{ t("write.editor.send_text") }}</bp-button>
          <bp-button :icon="IconDraftLine" type="plain" shape="circle"></bp-button>
        </div>
      </div>

      <div v-else :class="`${clsBlockName}-inner`">
        <router-link custom v-for="(v, k) in navItem" :to="v.to" v-slot="{ navigate, isExactActive }">
          <div :class="['mobile-bar-item', { active: isExactActive }]" @click="handleLink(navigate)">
            <component :is="v.icon" class="mobile-bar-icon" size="18" />
            <span class="mobile-bar-title">{{ v.title }}</span>
          </div>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  IconHome9Line,
  IconMailLine,
  IconEditCircleLine,
  IconUserSmileLine,
  IconSendPlaneFill,
  IconSaveLine,
  IconArrowGoBackLine,
  IconDraftLine,
} from "birdpaper-icon";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
  type: {
    type: String,
    default: "menu",
  },
});

defineOptions({ name: "MobileBar" });
const clsBlockName = "mobile-bar";
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
    to: "/test",
    icon: IconUserSmileLine,
  },
];
const handleLink = (navigate: () => void) => {
  navigate();
  window.scrollTo({ top: 0 });
};

const router = useRouter();
const goBack = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push("/");
  }
  window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: all 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.slide-up-down-enter-from {
  transform: translateY(20%);
  opacity: 0;
}

.slide-up-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-to {
  transform: translateY(20%);
  opacity: 0;
}
</style>
