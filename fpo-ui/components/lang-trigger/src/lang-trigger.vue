<template>
  <bp-dropdown @select="handleSelect">
    <div :class="clsBlockName">
      <IconTranslate2 size="16" />
    </div>
    <template #content>
      <bp-doption v-for="v in langList" :value="v.value">{{ v.title }}</bp-doption>
    </template>
  </bp-dropdown>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

defineOptions({ name: "LangTrigger" });
const clsBlockName = "lang-trigger";

const langList = [
  { title: "简体中文", value: "zh_CN" },
  { title: "English", value: "en" },
];

const currentLang = useStorage("lang", "zh_CN");

const handleSelect = (value: string) => {
  currentLang.value = value;
};

watch(
  () => currentLang.value,
  (ov, nv) => {
    if (ov && nv && ov !== nv) {
      window.location.reload();
    }
  },
  { immediate: true }
);
</script>
