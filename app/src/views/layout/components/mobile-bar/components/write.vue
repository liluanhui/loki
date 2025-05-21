<template>
  <div :class="`${clsBlockName}`">
    <bp-link :icon="IconArrowGoBackLine" style="margin-left: 6px" @click="emits('back')">{{ t("common.back") }}</bp-link>
    <div :class="`${clsBlockName}-btn-group`">
      <bp-link :icon="IconSaveLine" :loading="draftLoading" @click="emits('on-event', 'saveDraft')">
        {{ t("write.editor.draft_text") }}
      </bp-link>
      <bp-button :icon="IconSendPlaneFill" :loading="sendLoading" type="plain" shape="round" @click="emits('on-event', 'send')">
        {{ t("write.editor.send_text") }}
      </bp-button>
      <bp-button :icon="IconDraftLine" type="plain" shape="circle"></bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconSendPlaneFill, IconSaveLine, IconArrowGoBackLine, IconDraftLine } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();

const props = defineProps({
  draftLoading: {
    type: Boolean,
    default: false,
  },
  sendLoading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (e: "back"): void;
  (e: "on-event", name: string): void;
}>();
</script>
