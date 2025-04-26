<template>
  <div :class="clsBlockName">
    <div :class="[`${clsBlockName}-item`, { active: v.type === model }]" v-for="v in publicTypeList">
      <div :class="`${clsBlockName}-item-title`">{{ v.name }}</div>
      <letter-item size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import letterItem from "../../letter-item";

defineOptions({ name: "publicTypeSelector" });
const clsBlockName = "public-type-selector";

const model = defineModel({ type: String, default: "full" });

const publicTypeList = [
  {
    name: "完全公开",
    type: "full",
    recipient_type: "self",
    sender_avatar: "寄件人",
    sender_name: "寄件人",
    recipient_email: "11111111111@qq.com",
    recipient_name: "收件人",
  },
  {
    name: "隐私保护",
    type: "privary",
  },
  {
    name: "匿名",
    type: "anonymity",
  },
];
</script>
