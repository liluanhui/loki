<template>
  <div v-if="nickName" :class="`${clsBlockName}`">
    <p :class="`${clsBlockName}-inner`">回复 {{ nickName }}</p>
    <p :class="`${clsBlockName}-content`">{{ content }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  nickName: { type: String, default: "" },
  content: { type: String, default: "" },
});
const clsBlockName = "reply-info";
</script>
