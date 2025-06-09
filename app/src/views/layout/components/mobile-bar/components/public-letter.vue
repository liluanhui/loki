<template>
  <div :class="`${clsBlockName}`">
    <div :class="`${clsBlockName}-btn-group`" style="width: 100%">
      <bp-button :icon="IconCloseFill" type="dashed" shape="circle" @click="handleCancle"> </bp-button>
      <bp-button :icon="IconThumbUpLine" type="dashed" shape="circle"></bp-button>
      <bp-button :icon="IconChat1Line" type="plain" shape="round">评论</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCloseFill, IconThumbUpLine, IconChat1Line } from "birdpaper-icon";
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
