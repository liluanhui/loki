<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "AppMain" });
const clsBlockName = "app-main";
</script>
