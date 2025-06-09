<template>
  <div
    v-masonry="20"
    :class="clsBlockName"
    column-width=".letter-item"
    transition-duration="0s"
    :horizontal-order="true"
    :gutter="14"
    fit-width>
    <letter-item v-masonry-tile v-for="(item, index) in list" :key="index" v-bind="item" @click="onClick(item.id)" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineOptions({ name: "LetterWall" });
const clsBlockName = "letter-wall";

const props = defineProps({
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
const emits = defineEmits(["on-detail"]);

const onClick = (id: string) => {
  emits("on-detail", id);
};
</script>
