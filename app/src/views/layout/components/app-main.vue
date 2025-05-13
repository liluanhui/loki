<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "AppMain" });
const clsBlockName = "app-main";
</script>

<style lang="scss" scoped>
/* 淡入淡出过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
