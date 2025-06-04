<template>
  <div :class="`${clsBlockName}`">
    <div :class="`${clsBlockName}-btn-group`" style="width: 100%;">
      <bp-button :icon="IconCloseFill" type="dashed" shape="circle" @click="handleCancle"> </bp-button>
      <bp-button type="plain" shape="round">注册新账号</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCloseFill } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();

const emits = defineEmits<{
  (e: "on-event", name: string): void;
}>();

const handleCancle = () => {
  emits("on-event", "close");
};
const handleConfirm = () => {
  emits("on-event", "confirm");
};
</script>
