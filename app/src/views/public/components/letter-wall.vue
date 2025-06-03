<template>
  <div
    v-masonry="20"
    :class="clsBlockName"
    column-width=".letter-item"
    transition-duration="0s"
    :horizontal-order="true"
    :gutter="14"
    fit-width>
    <letter-item
      v-masonry-tile
      v-for="(item, index) in list"
      :key="index"
      :mode="item.public_type"
      :title="item.title"
      :no="item.fpo_no"
      :nickName="item.sender_name"
      :deliveryTime="item.deliver_at"
      :avatar="item.avatar"
      :createdAt="item.created_at"
      :type="item.recipient_type"
      :likes="item.likes"
      :comments="item.comments" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
});

defineOptions({ name: "LetterWall" });
const clsBlockName = "letter-wall";
</script>
