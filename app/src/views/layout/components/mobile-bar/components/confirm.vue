<template>
  <div :class="`${clsBlockName}`">
    <div :class="`${clsBlockName}-btn-group`">
      <bp-button :icon="IconCloseFill" type="plain" shape="round" @click="handleCancle">
        {{ t("common.close") }}
      </bp-button>
      <bp-button :icon="IconCheckFill" shape="round" @click="handleConfirm">
        {{ okText || t("common.confirm") }}
      </bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCheckFill, IconCloseFill } from "birdpaper-icon";
import { useI18n } from "vue-i18n";

const clsBlockName = "mobile-bar-inner";
const { t } = useI18n();

const props = defineProps({
  okText: { type: String },
});
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
