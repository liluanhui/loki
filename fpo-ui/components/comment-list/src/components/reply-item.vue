<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-item`">
      <div :class="`${clsBlockName}-item-avatar`">
        <bp-avatar size="mini" :image-url="avatar"></bp-avatar>
      </div>
      <div :class="`${clsBlockName}-item-content`">
        <p :class="`${clsBlockName}-item-name`">{{ nick_name }}</p>
        <p :class="`${clsBlockName}-item-inner`">{{ content }}</p>
        <div :class="`${clsBlockName}-item-footer`">
          <span class="time" :title="created_at">{{ _createdAt }} </span>
          <span class="region">{{ province ? province.replace(/省$/, "") : "" }}</span>
          <span class="comment"> <IconChat1Line size="14" />{{ comments <= 0 ? "回复" : comments }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import { useI18n } from "vue-i18n";

const props = defineProps({
  avatar: { type: String },
  comments: { type: Number },
  content: { type: String },
  province: { type: String },
  created_at: { type: String },
  id: { type: String },
  last_id: { type: String },
  level: { type: Number },
  nick_name: { type: String },
  root_id: { type: String },
  uid: { type: String },
});

defineOptions({ name: "ReplyComment" });
const clsBlockName = "reply-comment";

const { t, locale } = useI18n();
dayjs.locale(locale.value === "zh_CN" ? "zh-cn" : "en");
dayjs.extend(localeData);
dayjs.extend(relativeTime);

const _createdAt = computed(() => {
  return props.created_at ? dayjs().to(dayjs(props.created_at)) : "";
});
</script>
