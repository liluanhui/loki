<template>
  <template v-if="!isPopup">
    <div v-if="isLogin()" :class="clsBlockName">
      <reply-info v-if="isFocus" v-bind="reply" />

      <div :class="`${clsBlockName}-inner`">
        <bp-input
          ref="inpRef"
          v-model="form.content"
          is-round
          clearable
          :maxlength
          :placeholder
          @focus="onFocus"
          :style="{ width: isFocus ? '100%' : '220px' }">
          <template #prefix v-show="!isFocus">
            <bp-avatar size="mini" :image-url="userInfo.avatar" />
          </template>
        </bp-input>
        <bp-button v-show="!isFocus" :icon="IconHeart3Line" type="secondary" shape="round">赞</bp-button>
      </div>

      <div :class="[`${clsBlockName}-option`, { 'option-open': isFocus }]">
        <bp-button size="small" shape="round" type="dashed" @click="handleCancel">取消</bp-button>
        <bp-button size="small" shape="round" :disabled="!form.content" @click="onSubmit">发送</bp-button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center">
      <bp-button size="small" shape="round" type="plain" @click="handleLoginClick"> 登录后评论 </bp-button>
    </div>
  </template>

  <!-- 弹窗模式 -->
  <popup-editor ref="popupEditorRef" v-else :maxlength :placeholder :reply @submit="onSubmit" />
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { IconHeart3Line } from "birdpaper-icon";
import { PublicLetterCommentForm, PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";
import { msg } from "../../../fpo-ui";
import { addPublicLetterComment } from "@loki/odin-api";
import { useRef } from "../../../use/useCompRef";
import { Input } from "birdpaper-ui";
import popupEditor from "./components/popup-editor.vue";
import replyInfo from "./components/reply-info.vue";
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
const clsBlockName = "comment-editor";

const accountCtx = ref(inject("account", undefined));

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
  props.isPopup ? initEditPopup() : inpRef.value?.focus();
};

// 输入框引用
const inpRef = useRef(Input);

// 输入框聚焦状态
const isFocus = ref(false);

const { t } = useI18n();

const popupEditorRef = useRef(popupEditor);
const initEditPopup = () => {
  popupEditorRef.value?.init();
  return;
};
/**
 * 登录按钮点击
 */
const handleLoginClick = () => {
  if (!isLogin()) accountCtx.value?.login();
};
/**
 * 输入框聚焦
 */
const onFocus = () => {
  isFocus.value = true;
};

/**
 * 发送评论
 */
const onSubmit = async (data?: PublicLetterCommentForm) => {
  try {
    form.value = { ...form.value, ...data };
    form.value.mail_id = props.mailId;
    if (!form.value.content) {
      throw new Error('评论内容不能为空');
    };

    const res = await addPublicLetterComment(form.value);
    if (res.code !== 0) throw new Error(res.msg);

    isFocus.value = false;
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
  isFocus.value = false;
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
