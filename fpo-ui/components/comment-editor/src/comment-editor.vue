<template>
  <template v-if="!isPopup">
    <inner-editor ref="innerEditorRef" v-if="isLogin()" :maxlength :placeholder :reply @submit="onSubmit" />
  </template>

  <!-- 弹窗模式 -->
  <popup-editor ref="popupEditorRef" v-else :maxlength :placeholder :reply @submit="onSubmit" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PublicLetterCommentForm, PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";
import { msg } from "../../../fpo-ui";
import { addPublicLetterComment } from "@loki/odin-api";
import { useRef } from "../../../use/useCompRef";
import popupEditor from "./components/popup-editor.vue";
import innerEditor from "./components/inner-editor.vue";
// @ts-ignore
import { useUserStore } from "@/stores/useUser";

const props = defineProps({
  mailId: String,
  isPopup: { type: Boolean, default: false },
});
const emits = defineEmits<{
  (e: "success", data: PublicLetterCommentItem): void;
}>();

defineOptions({ name: "CommentEditor" });

// 用户信息
const { isLogin, userInfo } = useUserStore();
const maxlength = 500;
const placeholder = "说点什么...";

// 评论表单
const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

// 回复信息提示内容
class Reply {
  nickName: string = "";
  content: string = "";
}
const reply = ref<Reply>(new Reply());

/**
 * 初始化回复信息
 * @param root_id 回复评论根 ID
 * @param last_id 回复评论 ID
 * @param last_nick_name 回复用户昵称
 * @param content 回复评论
 */
const initReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  reply.value.nickName = last_nick_name;
  reply.value.content = content;
  Object.assign(form.value, {
    root_id,
    last_id,
    level: 1,
  });
  props.isPopup ? initEditPopup() : innerEditorRef.value?.inpRef.focus();
};

const innerEditorRef = useRef(innerEditor);

const popupEditorRef = useRef(popupEditor);
const initEditPopup = () => {
  popupEditorRef.value?.init();
  return;
};

/**
 * 发送评论
 */
const onSubmit = async (data?: PublicLetterCommentForm) => {
  try {
    form.value = { ...form.value, ...data };
    form.value.mail_id = props.mailId;
    if (!form.value.content) {
      throw new Error("评论内容不能为空");
    }

    const res = await addPublicLetterComment(form.value);
    if (res.code !== 0) throw new Error(res.msg);

    emits("success", {
      ...form.value,
      id: res.data,
      uid: userInfo.uid,
      nick_name: userInfo.nick_name,
      avatar: userInfo.avatar,
      created_at: new Date().toISOString(),
      comments: 0,
      last_nick_name: reply.value.nickName,
    });
    form.value.content = "";
    msg.success(res.msg);
    if (props.isPopup) popupEditorRef.value?.close();
  } catch (err) {
    msg.error((err as Error).message);
  }
};

/**
 * 取消评论
 */
const handleCancel = () => {
  form.value = new PublicLetterCommentForm();
  reply.value = new Reply();
};

// 对外暴露方法
defineExpose({
  initReply,
  handleCancel,
  initEditPopup,
});
</script>
