<template>
  <div :class="clsBlockName">
    <comment-item v-for="(item, index) in list" v-bind="item" :key="`comment-${index}`" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { msg } from "../../../fpo-ui";
import commentItem from "./components/comment-item.vue";
import { findPublicLetterCommentList } from "@loki/odin-api/publicLetter/comment";
import { PublicLetterCommentItem, PublicLetterCommentSearchParams } from "@loki/odin/src/types/publicLetter/comment";

defineOptions({ name: "CommentList" });
const clsBlockName = "comment-list";

const form = ref<PublicLetterCommentSearchParams>(new PublicLetterCommentSearchParams());
const list = ref<PublicLetterCommentItem[]>([]);
const count = ref(0);
const init = async (id: string) => {
  form.value.mail_id = id;

  try {
    const res = await findPublicLetterCommentList(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    list.value = res.data.list;
    count.value = res.data.count;
  } catch (err) {
    msg.error((err as Error).message);
  }
};

defineExpose({
  init,
});
</script>
