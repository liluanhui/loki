<template>
  <div
    v-masonry="20"
    :class="clsBlockName"
    column-width=".letter-item"
    transition-duration="0s"
    :horizontal-order="true"
    :gutter="14"
    fit-width>
    <letter-item v-masonry-tile v-for="(item, index) in 20" :key="item" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LetterWall" });
const clsBlockName = "letter-wall";
</script>
