<template>
  <bp-spin :spinning="loading">
    <div :class="[clsBlockName, { [`${clsBlockName}-popup`]: isPopup }]">
      <div :class="`${clsBlockName}-mail`">
        <p v-if="isPopup" :class="`${clsBlockName}-mail-title`">{{ title }}</p>

        <div :class="`${clsBlockName}-mail-info`">
          <div class="sender-info">
            <bp-avatar :image-url="_avatar" size="large"> </bp-avatar>
            <div class="sender-name" v-if="sender_name">
              <span class="sender-name-inner">{{ sender_name || "--" }}</span>
              <span class="sender-name-to">
                {{ t("write.editor.send_field") + ` ${isSelf ? t("write.editor.send_type.self") : recipient_name}` }}
              </span>
            </div>
          </div>
          <div class="time-ago">
            <span class="send-at">{{ _createdAt + ` ${t("write.sent")}` }}</span>
            <span class="delive-at">{{ t("common.delivered_at") + ` ${_deliveryAt}` }}</span>
          </div>
        </div>

        <div :class="`${clsBlockName}-mail-content`" v-show="content">
          <yuque-editor ref="viewerRef" editor-type="viewer"></yuque-editor>
        </div>

        <div :class="`${clsBlockName}-mail-footer`">
          <div class="public-no">
            <span class="public-no-inner">{{ _no }}</span>
          </div>
        </div>
      </div>
      <div :class="[`${clsBlockName}-comment`, { 'is-popup': isPopup }]">
        <div :class="`${clsBlockName}-comment-content`">
          <comment-list ref="commentListRef" @reply="onReply" />
        </div>
        <div v-if="!isPopup" :class="`${clsBlockName}-comment-footer`">
          <comment-editor ref="commentEditorRef" :mail-id="id" @success="onCommentSuccess" />
        </div>
      </div>
    </div>
  </bp-spin>
</template>

<script lang="ts" setup>
import YuqueEditor from "../../../yuque-editor";
import { useRef } from "../../../../use/useCompRef";
import { computed } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { CommentList } from "../../../comment-list";
import CommentEditor from "../../../comment-editor/src/comment-editor.vue";
import { PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";

const props = defineProps({
  isPopup: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  id: { type: String },
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
  comments: { type: Number, default: 0 },
});

defineOptions({ name: "DetailInner" });
const clsBlockName = "detail-inner";

const { t } = useI18n();

const commentListRef = useRef(CommentList);
const viewerRef = useRef(YuqueEditor);
const setContent = (content: string) => {
  viewerRef.value?.setViewerContent(content);
  commentListRef.value?.init(props.id);
};

const onCommentSuccess = (data: PublicLetterCommentItem) => {
  if (data.level === 0) {
    commentListRef.value?.list.unshift(data);
    return;
  }
  commentListRef.value?.updateItemChild(data);
};

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

// 投递时间处理
const _deliveryAt = computed(() => {
  return props.deliver_at ? dayjs().to(dayjs(props.deliver_at)) : "";
});

// 创建时间处理
const _createdAt = computed(() => {
  return props.created_at ? dayjs().to(dayjs(props.created_at)) : "";
});

const commentEditorRef = useRef(CommentEditor);
const onReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  commentEditorRef.value?.initReply(root_id, last_id, last_nick_name, content);
};

const reset = () => {
  commentListRef.value.list = [];
};

defineExpose({
  setContent,
  reset,
});
</script>
