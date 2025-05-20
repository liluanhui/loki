<template>
  <div :class="[clsBlockName, `${clsBlockName}-size-${size}`]">
    <div class="header">
      <div class="sender-info">
        <bp-avatar size="small" :image-url="avatar"></bp-avatar>
        <div class="sender-name">
          <span class="sender-name-inner">{{ nickName }}</span>
        </div>
      </div>
      <div v-if="size !== 'small'" class="time-ago">1 小时前</div>
    </div>

    <div class="body">
      <div class="letter-to">寄给十年后的自己</div>
      <div v-if="size !== 'small'" class="letter-title">十年后的你，还好吗？</div>
    </div>

    <div v-if="size !== 'small'" class="footer">
      <div class="public-no">
        <span class="public-no-inner">NO.23981001</span>
      </div>
      <div class="statistic">
        <span class="statistic-item"><IconThumbUpLine size="14" />122</span>
        <span class="statistic-item"><IconChat1Line size="14" />344</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineOptions({ name: "LetterItem" });
const clsBlockName = "letter-item";

const props = defineProps({
  size: {
    type: String as PropType<"small" | "normal">,
    default: "normal",
  },
  type: {
    type: String as PropType<"self" | "email">,
    default: "self",
  },
  avatar: {
    type: String,
    default: "",
  },
  nickName: {
    type: String,
    default: "",
  },
  deliveryTime: {
    type: String,
    default: "",
  },
  recipientName: {
    type: String,
    default: "",
  },
});
</script>
