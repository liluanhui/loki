<template>
  <div :class="clsBlockName" @click="handleTrigger">
    <Transition name="fade-page" mode="out-in">
      <IconSunLine v-if="currentTheme === 'light'" size="16" />
      <IconMoonLine v-else size="16" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

defineOptions({ name: "ThemeTrigger" });
const clsBlockName = "theme-trigger";

const currentTheme = useStorage("theme", "light");
const handleTrigger = () => {
  currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
};

watch(
  () => currentTheme.value,
  (newTheme) => {
    document.documentElement.setAttribute("class", newTheme);
  },
  { immediate: true }
);
</script>

<style lang="scss">
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.2s ease;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
