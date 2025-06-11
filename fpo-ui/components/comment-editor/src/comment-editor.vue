<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <bp-button v-show="!isFoucus" :icon="IconThumbUpLine" type="secondary" shape="circle" />
      <bp-input v-model="form.content" is-round clearable :maxlength="25" show-limit placeholder="说点什么..." @focus="onFocus">
        <template #prefix v-show="!isFoucus">
          <bp-avatar size="mini" image-url="https://moya-1251999712.cos.ap-guangzhou.myqcloud.com/avatar/avatar_sam.jpg" />
        </template>
      </bp-input>
    </div>

    <div :class="[`${clsBlockName}-option`, { 'option-open': isFoucus }]">
      <bp-button size="small" shape="round" type="dashed" @click="isFoucus = false">取消</bp-button>
      <bp-button size="small" shape="round">发送</bp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { IconThumbUpLine } from "birdpaper-icon";
import { ref } from "vue";
import { PublicLetterCommentForm } from "../../../../odin/src/types/publicLetter/comment";

const props = defineProps({
  // isLogin: { type: Boolean, default: false },
});

defineOptions({ name: "CommentEditor" });
const clsBlockName = "comment-editor";

const { t } = useI18n();
const form = ref<PublicLetterCommentForm>(new PublicLetterCommentForm());

const isFoucus = ref(false);
const onFocus = () => {
  isFoucus.value = true;
};
</script>
