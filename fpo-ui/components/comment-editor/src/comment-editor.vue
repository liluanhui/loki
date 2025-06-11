<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <bp-button v-show="!isFoucus" :icon="IconHeart3Line" type="secondary" shape="round">赞</bp-button>
      <bp-input v-model="form.content" is-round clearable :maxlength="500" placeholder="说点什么..." @focus="isFoucus = true">
        <template #prefix v-show="!isFoucus">
          <bp-avatar size="mini" image-url="https://moya-1251999712.cos.ap-guangzhou.myqcloud.com/avatar/avatar_sam.jpg" />
        </template>
      </bp-input>
    </div>

    <div :class="[`${clsBlockName}-option`, { 'option-open': isFoucus }]">
      <bp-button size="small" shape="round" type="dashed" @click="isFoucus = false">取消</bp-button>
      <bp-button size="small" shape="round" :disabled="!form.content" @click="onSubmit">发送</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { IconHeart3Line } from "birdpaper-icon";
import { ref } from "vue";
import { PublicLetterCommentForm } from "../../../../odin/src/types/publicLetter/comment";
import { msg } from "../../../fpo-ui";
import { addPublicLetterComment } from "@loki/odin-api";

const props = defineProps({
  mailId: { type: String },
});
const emits = defineEmits<{
  (e: "success"): void;
}>();

defineOptions({ name: "CommentEditor" });
const clsBlockName = "comment-editor";

const { t } = useI18n();
const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

const isFoucus = ref(false);
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
    form.value.content = "";
    isFoucus.value = false;
    msg.success(res.msg);
    emits("success");
  } catch (err) {
    msg.error((err as Error).message);
  }
};
</script>
