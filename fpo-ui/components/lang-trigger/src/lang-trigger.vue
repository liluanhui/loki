<template>
  <div :class="clsBlockName">
    <bp-dropdown @select="handleSelect">
      <IconTranslate2 size="16" />

      <template #content>
        <bp-doption v-for="v in langList" :value="v.value">{{ v.title }}</bp-doption>
      </template>
    </bp-dropdown>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LangTrigger" });
const clsBlockName = "lang-trigger";

const langList = [
  { title: "中文 - 简", value: "zh-CN" },
  { title: "English", value: "en" },
];

const handleSelect = (value: string) => {
  console.log("Selected value:", value);
};
</script>
