<template>
  <div :class="`${clsBlockName}`">
    <div :class="`${clsBlockName}-btn-group`">
      <bp-button :icon="IconCloseFill" type="plain" shape="round">关闭</bp-button>
      <bp-button :icon="IconCheckFill" shape="round">确认</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCheckFill, IconCloseFill } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();
</script>
