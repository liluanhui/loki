<template>
  <template v-if="!isPopup">
    <div v-if="isLogin()" :class="clsBlockName">
      <!-- 回复信息 -->
      <div v-if="lastNickName && isFocus" :class="`${clsBlockName}-reply`">
        <p :class="`${clsBlockName}-reply-inner`">回复 {{ lastNickName }}</p>
        <p :class="`${clsBlockName}-reply-content`">{{ lastContent }}</p>
      </div>

      <div :class="`${clsBlockName}-inner`">
        <bp-input
          ref="inpRef"
          v-model="form.content"
          is-round
          clearable
          :maxlength="500"
          placeholder="说点什么..."
          @focus="onFocus"
          :style="{ width: isFocus ? '100%' : '220px' }"
        >
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
  <popup
    v-else
    v-model:show="editPopupShow"
    position="bottom"
    :style="{ height: '100%' }"
    :duration="0.2"
    lock-scroll
    safe-area-inset-bottom
    @close="closeEditorPopup"
  >
    <div class="popup-header">评论</div>
    <div style="margin-top: 52px; padding: 0 16px">
      <div v-if="lastNickName" :class="`${clsBlockName}-reply`">
        <p :class="`${clsBlockName}-reply-inner`">回复 {{ lastNickName }}</p>
        <p :class="`${clsBlockName}-reply-content`">{{ lastContent }}</p>
      </div>
      <bp-textarea
        ref="editorRef"
        v-model="form.content"
        rows="6"
        placeholder="说点什么"
        :maxlength="500"
        clearable
      />
    </div>
  </popup>
</template>

<script lang="ts" setup>
import { inject, nextTick, ref } from "vue";
import { useI18n } from "vue-i18n";
import { IconHeart3Line } from "birdpaper-icon";
import { PublicLetterCommentForm, PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";
import { msg } from "../../../fpo-ui";
import { addPublicLetterComment } from "@loki/odin-api";
import { useRef } from "../../../use/useCompRef";
import { Input } from "birdpaper-ui";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
// @ts-ignore
import { useUserStore } from "@/stores/useUser";

// 组件属性与事件
const props = defineProps({
  mailId: String,
  isPopup: { type: Boolean, default: false },
});
const emits = defineEmits<{
  (e: "success", data: PublicLetterCommentItem): void;
}>();

defineOptions({ name: "CommentEditor" });
const clsBlockName = "comment-editor";

// 依赖注入
const mobileBarCtx: any = inject("mobile-bar");
const accountCtx = ref(inject("account", undefined));

// 用户信息
const { isLogin, userInfo } = useUserStore();

// 编辑弹窗控制
const editPopupShow = ref(false);
const editorRef = ref<HTMLElement | null>(null);

// 评论表单
const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

// 回复相关
const lastNickName = ref("");
const lastContent = ref("");

// 输入框引用
const inpRef = useRef(Input);

// 输入框聚焦状态
const isFocus = ref(false);

// 国际化
const { t } = useI18n();

/**
 * 初始化弹窗编辑器
 */
const initEditPopup = () => {
  editPopupShow.value = true;
  nextTick(() => {
    mobileBarCtx?.change("confirm", {
      props: {
        okText: "发送",
        okDisabled: () => !form.value.content,
      },
      events: {
        close: closeEditorPopup,
        confirm: onSubmit,
      },
    });
  });
};

/**
 * 关闭弹窗编辑器
 */
const closeEditorPopup = () => {
  editPopupShow.value = false;
  mobileBarCtx?.reset();
};

/**
 * 登录按钮点击
 */
const handleLoginClick = () => {
  if (!isLogin()) accountCtx.value?.login();
};

/**
 * 初始化回复信息
 */
const initReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  lastNickName.value = last_nick_name;
  lastContent.value = content;
  Object.assign(form.value, {
    root_id,
    last_id,
    level: 1,
  });
  props.isPopup ? initEditPopup() : inpRef.value?.focus();
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
const onSubmit = async () => {
  if (!form.value.content) return;
  try {
    form.value.mail_id = props.mailId;
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
      last_nick_name: lastNickName.value,
    });
    form.value.content = "";
    msg.success(res.msg);
    if (props.isPopup) closeEditorPopup();
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
  lastNickName.value = "";
  lastContent.value = "";
};

// 对外暴露方法
defineExpose({
  initReply,
  handleCancel,
  initEditPopup,
});
</script>
