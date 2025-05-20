<template>
  <div :class="[clsBlockName, `${clsBlockName}-size-${size}`]">
    <div class="header">
      <div class="sender-info">
        <bp-avatar size="small" :image-url="avatar"></bp-avatar>
        <div class="sender-name">
          <span class="sender-name-inner">{{ nickName || "--" }}</span>
        </div>
      </div>
      <div v-if="size !== 'small'" class="time-ago">{{ createdAt || "--" }}</div>
    </div>

    <div class="body">
      <div class="letter-to">寄给{{ deliveryTime || "--" }}后的{{ isSelf ? "自己" : recipientName || "--" }}</div>
      <div v-if="size !== 'small'" class="letter-title">{{ title || "--" }}</div>
    </div>

    <div v-if="size !== 'small'" class="footer">
      <div class="public-no">
        <span class="public-no-inner">NO.{{ no || "--" }}</span>
      </div>
      <div class="statistic">
        <span class="statistic-item"><IconThumbUpLine size="14" />{{ likes }}</span>
        <span class="statistic-item"><IconChat1Line size="14" />{{ comments }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

defineOptions({ name: "LetterItem" });
const clsBlockName = "letter-item";

const props = defineProps({
  size: {
    type: String as PropType<"small" | "normal">,
    default: "normal",
  },
  mode: {
    type: String as PropType<"full" | "privary" | "anonymity">,
    default: "full",
  },
  type: {
    type: String as PropType<"self" | "email">,
    default: "self",
  },
  no: {
    type: String,
  },
  title: {
    type: String,
  },
  avatar: {
    type: String,
  },
  nickName: {
    type: String,
  },
  deliveryTime: {
    type: String,
    default: "",
  },
  recipientName: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
});

const isSelf = computed(() => {
  return props.type === "self";
});
</script>
