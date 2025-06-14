<template>
  <div :class="`${clsBlockName}`">
    <div :class="`${clsBlockName}-btn-group`" style="width: 100%">
      <bp-button :icon="IconCloseFill" type="dashed" shape="circle" @click="handleCancle"> </bp-button>
      <bp-button :icon="IconHeart3Line" type="plain" shape="round" :disabled="!isLogin()"></bp-button>
      <bp-button :icon="IconChat1Line" type="plain" shape="round" @click="handleComment">{{ isLogin() ? "评论" : "登录后评论" }}</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/useUser";
import { IconCloseFill, IconHeart3Line, IconChat1Line } from "birdpaper-icon";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();

const emits = defineEmits<{
  (e: "on-event", name: string): void;
}>();

const accountCtx = ref(inject("account", undefined));
const { isLogin } = useUserStore();

const handleCancle = () => {
  emits("on-event", "close");
};
const handleComment = () => {
  if (!isLogin()) {
    accountCtx.value.login();
    return;
  }
  emits("on-event", "comment");
};
</script>
