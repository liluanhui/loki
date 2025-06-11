<template>
  <div :class="clsBlockName">
    <p v-for="v in 70">List</p>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "CommentList" });
const clsBlockName = "comment-list";
</script>
