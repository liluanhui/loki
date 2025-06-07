<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-mail`">
      <div :class="`${clsBlockName}-mail-info`">
        <div class="sender-info">
          <bp-avatar :image-url="_avatar" size="large"> </bp-avatar>
          <div class="sender-name">
            <span class="sender-name-inner">{{ sender_name || "--" }}</span>
            <span class="sender-name-to">{{ "寄给 Sam" }}</span>
          </div>
        </div>
        <div class="time-ago">
          <span class="send-at">10年前</span>
          <!-- <span class="delive-at">投递于 2025-12-31</span> -->
        </div>
      </div>

      <div :class="`${clsBlockName}-mail-content`">
        <yuque-editor ref="viewerRef" editor-type="viewer"></yuque-editor>
      </div>

      <div :class="`${clsBlockName}-mail-footer`">
        <div class="public-no">
          <span class="public-no-inner">NO.{{ _no }}</span>
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

defineExpose({
  setContent,
});
</script>
