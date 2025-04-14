<template>
  <div class="app-layout">
    <topBar />
    <appMain />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import topBar from "./components/top-bar.vue";
import appMain from "./components/app-main.vue";

const route = useRoute();
</script>
