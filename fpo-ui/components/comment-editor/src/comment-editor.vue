<template>
  <div v-if="isLogin()" :class="clsBlockName">
    <div v-if="lastNickName && isFoucus" :class="`${clsBlockName}-reply`">
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
        :style="{ width: isFoucus ? '100%' : '220px' }">
        <template #prefix v-show="!isFoucus">
          <bp-avatar size="mini" :image-url="userInfo.avatar" />
        </template>
      </bp-input>
      <bp-button v-show="!isFoucus" :icon="IconHeart3Line" type="secondary" shape="round">赞</bp-button>
    </div>

    <div :class="[`${clsBlockName}-option`, { 'option-open': isFoucus }]">
      <bp-button size="small" shape="round" type="dashed" @click="handleCancle">取消</bp-button>
      <bp-button size="small" shape="round" :disabled="!form.content" @click="onSubmit">发送</bp-button>
    </div>
  </div>

  <div v-else class="flex justify-center items-center">
    <bp-button size="small" shape="round" type="plain" @click="handleLoginClick"> 登录后评论 </bp-button>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
// @ts-ignore
import { useUserStore } from "@/stores/useUser";
import { IconHeart3Line } from "birdpaper-icon";
import { PublicLetterCommentForm, PublicLetterCommentItem } from "@loki/odin/src/types/publicLetter/comment";
import { msg } from "../../../fpo-ui";
import { addPublicLetterComment } from "@loki/odin-api";
import { useRef } from "../../../use/useCompRef";
import { Input } from "birdpaper-ui";

const props = defineProps({
  mailId: { type: String },
});
const emits = defineEmits<{
  (e: "success", data: PublicLetterCommentItem): void;
}>();

defineOptions({ name: "CommentEditor" });
const clsBlockName = "comment-editor";

const accountCtx = ref(inject("account", undefined));
const { isLogin, userInfo } = useUserStore();
const handleLoginClick = () => {
  if (!isLogin()) {
    accountCtx.value.login();
    return;
  }
};

const { t } = useI18n();
const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

const lastNickName = ref("");
const lastContent = ref("");
const inpRef = useRef(Input);
const initReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  lastNickName.value = last_nick_name;
  lastContent.value = content;

  form.value.root_id = root_id;
  form.value.last_id = last_id;
  form.value.level = 1;
  inpRef.value?.focus();
};

const isFoucus = ref(false);
const onFocus = () => {
  isFoucus.value = true;
};

const onSubmit = async () => {
  if (!form.value.content) {
    return;
  }
  try {
    form.value.mail_id = props.mailId;
    const res = await addPublicLetterComment(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    isFoucus.value = false;
    emits("success", {
      ...form.value,
      id: res.data,
      uid: userInfo.uid,
      nick_name: userInfo.nick_name,
      avatar: userInfo.avatar,
      created_at: new Date().toISOString(),
      comments: 0,
    });
    form.value.content = "";
    msg.success(res.msg);
  } catch (err) {
    msg.error((err as Error).message);
  }
};

const handleCancle = () => {
  isFoucus.value = false;
  form.value = new PublicLetterCommentForm();
  lastNickName.value = "";
  lastContent.value = "";
};

defineExpose({
  initReply,
  handleCancle,
});
</script>
