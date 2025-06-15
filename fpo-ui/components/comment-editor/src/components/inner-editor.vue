<template>
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
        @focus="isFocus = true"
        :style="{ width: isFocus ? '100%' : '220px' }">
        <template #prefix v-show="!isFocus">
          <bp-avatar size="mini" :image-url="userInfo.avatar" />
        </template>
      </bp-input>
      <bp-button v-show="!isFocus" :icon="IconHeart3Line" type="secondary" shape="round">赞</bp-button>
    </div>

    <div :class="[`${clsBlockName}-option`, { 'option-open': isFocus }]">
      <bp-button size="small" shape="round" type="dashed" @click="close">取消</bp-button>
      <bp-button size="small" shape="round" :loading :disabled="!form.content" @click="onSubmit">发送</bp-button>
    </div>
  </div>

  <div v-else class="flex justify-center items-center">
    <bp-button size="small" shape="round" type="plain" @click="handleLoginClick"> 登录后评论 </bp-button>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import replyInfo from "./reply-info.vue";
import { IconHeart3Line } from "birdpaper-icon";
import { PublicLetterCommentForm } from "@loki/odin/src/types/publicLetter/comment";
// @ts-ignore
import { useUserStore } from "@/stores/useUser";
import { useRef } from "../../../../use/useCompRef";
import { Input } from "birdpaper-ui";

const props = defineProps({
  placeholder: String,
  maxlength: Number,
  loading: { type: Boolean, default: false },
  reply: { type: Object, default: () => ({}) },
});
const emits = defineEmits<{
  (e: "submit", data: PublicLetterCommentForm): void;
}>();

const clsBlockName = "inner-editor";

const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());
const { isLogin, userInfo } = useUserStore();

const inpRef = useRef(Input);
const isFocus = ref(false);

const close = () => {
  isFocus.value = false;
  form.value = new PublicLetterCommentForm();
};

const onSubmit = () => {
  if (!form.value.content) return;
  emits("submit", form.value);
  close();
};

const accountCtx = ref(inject("account", undefined));
const handleLoginClick = () => {
  if (!isLogin()) accountCtx.value?.login();
};

const init = () => {
  inpRef.value?.focus();
};

defineExpose({
  inpRef,
  init,
  close,
});
</script>
