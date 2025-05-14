<template>
  <div :class="`${clsBlockName}`">
    <bp-link :icon="IconArrowGoBackLine" style="margin-left: 6px" @click="emits('back')">{{ t("common.back") }}</bp-link>
    <div :class="`${clsBlockName}-btn-group`">
      <bp-link :icon="IconSaveLine">{{ t("write.editor.draft_text") }}</bp-link>
      <bp-button :icon="IconSendPlaneFill" type="plain" shape="round">{{ t("write.editor.send_text") }}</bp-button>
      <bp-button :icon="IconDraftLine" type="plain" shape="circle"></bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconSendPlaneFill, IconSaveLine, IconArrowGoBackLine, IconDraftLine, IconCheckFill, IconCloseFill } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();

const emits = defineEmits(["back"]);
</script>
