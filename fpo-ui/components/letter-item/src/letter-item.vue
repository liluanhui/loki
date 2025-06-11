<template>
  <div :class="[clsBlockName, `${clsBlockName}-size-${size}`]">
    <div class="header">
      <div class="sender-info">
        <bp-avatar size="small" :image-url="_avatar"> </bp-avatar>
        <div class="sender-name">
          <span class="sender-name-inner">{{ sender_name || "--" }}</span>
        </div>
      </div>
      <div v-if="size !== 'small'" class="time-ago" :title="deliver_at">{{ _deliveryAt || "--" }}</div>
    </div>

    <div class="body">
      <div class="letter-to">{{ _letterTo }}</div>
      <div v-if="size !== 'small'" class="letter-title">{{ title || "--" }}</div>
    </div>

    <div v-if="size !== 'small'" class="footer">
      <div class="public-no">
        <span class="public-no-inner">{{ _no || "--" }}</span>
      </div>
      <div class="statistic">
        <span class="statistic-item"> <IconHeart3Line size="14" />{{ likes > 0 ? likes : "" }} </span>
        <span class="statistic-item"> <IconChat1Line size="14" />{{ comments > 0 ? comments : "" }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, PropType } from "vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";

defineOptions({ name: "LetterItem" });
const clsBlockName = "letter-item";

const props = defineProps({
  size: { type: String as PropType<"small" | "normal">, default: "normal" },
  title: { type: String },
  fpo_no: { type: String },
  sender_name: { type: String },
  content: { type: String },
  avatar: { type: String },
  recipient_type: { type: String, default: "self" },
  recipient_name: { type: String },
  public_type: { type: String, default: "public" },
  created_at: { type: String },
  deliver_at: { type: String },
  likes: { type: Number },
  comments: { type: Number },
});

const { t, locale } = useI18n();
dayjs.locale(locale.value === "zh_CN" ? "zh-cn" : "en");
dayjs.extend(localeData);
dayjs.extend(relativeTime);

const isSelf = computed(() => props.recipient_type === "self");

// 邮寄单号处理
const _no = computed(() => {
  return props.fpo_no ? `NO.${props.fpo_no}` : "--";
});

// 用户头像处理
const _avatar = computed(() => {
  if (props.public_type === "anonymity") {
    return "";
  }
  return props.avatar;
});

// 寄往时间处理
const _toTime = computed(() => {
  return props.deliver_at ? dayjs(props.created_at).to(dayjs(props.deliver_at), true) : "";
});

const _deliveryAt = computed(() => {
  return props.deliver_at ? dayjs().to(dayjs(props.deliver_at)) : "";
});

const _letterTo = computed(() => {
  if (!_toTime.value) {
    return "--";
  }
  switch (locale.value) {
    case "zh_CN":
      return `寄给 ${_toTime.value}后的${isSelf.value ? "自己" : props.recipient_name}`;
    case "en":
      return `To ${isSelf.value ? "self" : props.recipient_name}, ${_toTime.value} later`;
    default:
      return `--`;
  }
});
</script>
