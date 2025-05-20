<template>
  <div :class="[clsBlockName, `${clsBlockName}-size-${size}`]">
    <div class="header">
      <div class="sender-info">
        <bp-avatar size="small" :image-url="_avatar"></bp-avatar>
        <div class="sender-name">
          <span class="sender-name-inner">{{ _niclkName || "--" }}</span>
        </div>
      </div>
      <div v-if="size !== 'small'" class="time-ago">{{ createdAt || "--" }}</div>
    </div>

    <div class="body">
      <div class="letter-to">{{ _letterTo }}</div>
      <div v-if="size !== 'small'" class="letter-title">{{ title || "--" }}</div>
    </div>

    <div v-if="size !== 'small'" class="footer">
      <div class="public-no">
        <span class="public-no-inner">NO.{{ no || "--" }}</span>
      </div>
      <div class="statistic">
        <span class="statistic-item"> <IconThumbUpLine size="14" />{{ likes }} </span>
        <span class="statistic-item"> <IconChat1Line size="14" />{{ comments }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, PropType } from "vue";

defineOptions({ name: "LetterItem" });
const clsBlockName = "letter-item";

const props = defineProps({
  size: { type: String as PropType<"small" | "normal">, default: "normal" },
  mode: { type: String as PropType<"full" | "privary" | "anonymity">, default: "full" },
  type: { type: String as PropType<"self" | "email">, default: "self" },
  no: { type: String },
  title: { type: String },
  avatar: { type: String },
  nickName: { type: String },
  deliveryTime: { type: String },
  recipientName: { type: String },
  createdAt: { type: String },
  likes: { type: Number },
  comments: { type: Number },
});

const { t, locale } = useI18n();
const isSelf = computed(() => props.type === "self");
// 用户头像处理
const _avatar = computed(() => {
  if (props.mode === "anonymity") {
    return "";
  }
  return props.avatar;
});

// 用户昵称处理
const _niclkName = computed(() => {
  if (props.mode === "anonymity") {
    return t("write.editor.public_type_list.anonymity");
  }
  if (props.mode === "privary") {
    return props.nickName.slice(0, 1) + "**";
  }
  return props.nickName;
});

// 收件人处理
const _recipientName = computed(() => {
  if (props.mode === "anonymity") {
    return "***";
  }
  if (props.mode === "privary") {
    return props.recipientName.slice(0, 1) + "**";
  }
  return props.recipientName;
});

const _letterTo = computed(() => {
  switch (locale.value) {
    case "zh_CN":
      return `寄给${props.deliveryTime || "--"}后的${isSelf.value ? "自己" : _recipientName.value || "--"}`;
    case "en":
      return `To ${isSelf.value ? "self" : _recipientName.value || "--"}, ${props.deliveryTime || "--"} later`;
    default:
  }
});
</script>
