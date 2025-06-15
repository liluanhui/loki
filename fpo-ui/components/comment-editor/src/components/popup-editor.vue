<template>
  <popup
    v-model:show="editPopupShow"
    position="bottom"
    :style="{ height: '100%' }"
    :duration="0.2"
    lock-scroll
    safe-area-inset-bottom
    @close="close">
    <div class="popup-header">评论</div>
    <div style="margin-top: 52px; padding: 0 16px">
      <reply-info v-bind="reply" />
      <bp-textarea ref="editorRef" v-model="form.content" :rows="6" :placeholder :maxlength clearable />
    </div>
  </popup>
</template>

<script lang="ts" setup>
import replyInfo from "./reply-info.vue";
import { PublicLetterCommentForm } from "@loki/odin/src/types/publicLetter/comment";
import { inject, nextTick, ref } from "vue";
import { Popup } from "vant";
import "vant/lib/popup/style/index";

const props = defineProps({
  placeholder: String,
  maxlength: Number,
  reply: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits<{
  (e: "submit", data: PublicLetterCommentForm): void;
}>();

const mobileBarCtx: any = inject("mobile-bar");

const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

const editPopupShow = ref(false);
const init = () => {
  editPopupShow.value = true;
  nextTick(() => {
    mobileBarCtx?.change("confirm", {
      props: {
        okText: "发送",
        okDisabled: () => !form.value.content,
      },
      events: {
        close,
        confirm: () => emits("submit", form.value),
      },
    });
  });
};

const close = () => {
  editPopupShow.value = false;
  mobileBarCtx?.reset();
};

defineExpose({
  init,
  close,
});
</script>
