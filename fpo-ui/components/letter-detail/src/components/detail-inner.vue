<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-mail`">
      <div :class="`${clsBlockName}-mail-info`">
        <div class="sender-info">
          <bp-avatar :image-url="_avatar" size="large"> </bp-avatar>
          <div class="sender-name">
            <span class="sender-name-inner">{{ sender_name || "--" }}</span>
            <span class="sender-name-to">
              {{ t('write.editor.send_field') + ` ${isSelf ? t('write.editor.send_type.self') : _recipientName}` }}
            </span>
          </div>
        </div>
        <div class="time-ago">
          <span class="send-at">{{ _createdAt + ` ${t('write.sent')}` }}</span>
          <span class="delive-at">{{ t('common.delivered_at') + ` ${_deliveryAt}` }}</span>
        </div>
      </div>

      <div :class="`${clsBlockName}-mail-content`">
        <yuque-editor ref="viewerRef" editor-type="viewer"></yuque-editor>
      </div>

      <div :class="`${clsBlockName}-mail-footer`">
        <div class="public-no">
          <span class="public-no-inner">{{ _no }}</span>
        </div>
      </div>
    </div>
    <div :class="`${clsBlockName}-comment`">
      <div :class="`${clsBlockName}-comment-header`">
        <span :class="`${clsBlockName}-comment-header-inner`">共 0 条评论</span>
      </div>
      <div :class="`${clsBlockName}-comment-content`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YuqueEditor from "../../../yuque-editor";
import { useRef } from "../../../../use/useCompRef";
import { computed } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

const props = defineProps({
  id: { type: String },
  fpo_no: { type: String },
  sender_name: { type: String },
  content: { type: String },
  avatar: { type: String },
  mode: { type: String },
  recipient_type: { type: String, default: "self" },
  recipient_email: { type: String },
  recipient_name: { type: String },
  public_type: { type: String, default: "public" },
  created_at: { type: String },
  deliver_at: { type: String },
});

defineOptions({ name: "DetailInner" });
const clsBlockName = "detail-inner";

const { t } = useI18n();
const viewerRef = useRef(YuqueEditor);
const setContent = (content: string) => {
  viewerRef.value?.setViewerContent(content);
};

const isSelf = computed(() => props.recipient_type === "self");

// 邮寄单号处理
const _no = computed(() => {
  return props.fpo_no ? `NO.${props.fpo_no}` : "--";
});

// 用户头像处理
const _avatar = computed(() => {
  if (props.mode === "anonymity") {
    return "";
  }
  return props.avatar;
});

// 收件人处理
const _recipientName = computed(() => {
  if (props.mode === "anonymity") {
    return "***";
  }
  if (props.mode === "privary") {
    return props.recipient_name.slice(0, 1) + "**";
  }
  return props.recipient_name;
});

// 投递时间处理
const _deliveryAt = computed(() => {
  return props.deliver_at ? dayjs().to(dayjs(props.deliver_at)) : "";
});

// 创建时间处理
const _createdAt = computed(() => {
  return props.created_at ? dayjs().to(dayjs(props.created_at)) : "";
});

defineExpose({
  setContent,
});
</script>
