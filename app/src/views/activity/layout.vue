<template>
  <div :class="clsBlockName">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ActivityPage" });
const clsBlockName = "activity-page";
</script>
