<template>
  <component ref="editorRef" :is="_component" :loading :maxlength :placeholder :reply @submit="onSubmit"></component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PublicLetterCommentForm, PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";
import { addPublicLetterComment } from "@loki/odin-api";
import { msg } from "../../../fpo-ui";
import { useRef } from "../../../use/useCompRef";
// @ts-ignore
import { useUserStore } from "@/stores/useUser";
import popupEditor from "./components/popup-editor.vue";
import innerEditor from "./components/inner-editor.vue";

const props = defineProps({
  mailId: String,
  isPopup: { type: Boolean, default: false },
});
const emits = defineEmits<{
  (e: "success", data: PublicLetterCommentItem): void;
}>();

defineOptions({ name: "CommentEditor" });
const { userInfo } = useUserStore();

const maxlength = 500;
const placeholder = "说点什么...";

// 评论内联组件
const editorRef = useRef(popupEditor) || useRef(innerEditor);
const _component = props.isPopup ? popupEditor : innerEditor;

const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

const loading = ref(false);
const onSubmit = async (data?: PublicLetterCommentForm) => {
  try {
    loading.value = true;
    form.value = { ...form.value, ...data, level: form.value.level };
    form.value.mail_id = props.mailId;
    if (!form.value.content) {
      throw new Error("评论内容不能为空");
    }

    const res = await addPublicLetterComment(form.value);
    if (res.code !== 0) throw new Error(res.msg);

    // 用于本地回显评论数据，目前IP地址和归属地无法处理
    const redisplayData = {
      ...form.value,
      id: res.data,
      uid: userInfo.uid,
      nick_name: userInfo.nick_name,
      avatar: userInfo.avatar,
      created_at: new Date().toISOString(),
      comments: 0,
      last_nick_name: reply.value.nickName,
    };

    form.value.content = "";
    msg.success(res.msg);
    emits("success", redisplayData);
    editorRef.value?.close();
  } catch (err) {
    msg.error((err as Error).message);
  } finally {
    loading.value = false;
  }
};

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
  Object.assign(form.value, { root_id, last_id, level: 1 });
  reply.value.nickName = last_nick_name;
  reply.value.content = content;
  editorRef.value?.init();
};

defineExpose({
  editorRef,
  initReply,
});
</script>
