<template>
  <div class="app-layout">
    <topBar />

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import topBar from "./components/top-bar.vue";

const route = useRoute();
</script>
