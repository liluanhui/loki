<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-avatar`">
      <bp-avatar size="small" :image-url="avatar"></bp-avatar>
    </div>
    <div :class="`${clsBlockName}-content`">
      <p :class="`${clsBlockName}-name`">{{ nick_name }}</p>
      <p :class="`${clsBlockName}-inner`">{{ content }}</p>
      <div :class="`${clsBlockName}-footer`">
        <span class="time" :title="created_at">{{ _createdAt }} </span>
        <span class="region">{{ province ? province.replace(/省$/, "") : "" }}</span>
        <span class="comment" @click="handleReply"> <IconChat1Line size="14" />{{ comments <= 0 ? "回复" : comments }} </span>
      </div>
      <p
        v-if="comments > 0 && replyList.length === 0 && !loading"
        :class="`${clsBlockName}-expand-reply`"
        @click="handleSearchReply({ pageNum: 1, pageSize: 10 })">
        展开 {{ comments }} 条回复
      </p>
      <skeleton title avatar :row="2" animate :loading="loading && form.pageNum === 1" :style="{ width: '100%', 'margin-top': '10px' }">
        <reply-item v-bind="v" v-for="v in replyList" :root_id="id" :key="`reply-${v.id}`" @reply="onReplyItemReply"></reply-item>
      </skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import { Skeleton } from "vant";
import "vant/lib/skeleton/style/index";
import { useI18n } from "vue-i18n";
import replyItem from "./reply-item.vue";
import { msg } from "../../../../fpo-ui";
import { findPublicLetterCommentList } from "@loki/odin-api";
import { PublicLetterCommentItem, PublicLetterCommentSearchParams } from "@loki/odin/src/types/publicLetter/comment";

const props = defineProps({
  avatar: { type: String },
  comments: { type: Number },
  content: { type: String },
  province: { type: String },
  created_at: { type: String },
  id: { type: String },
  last_id: { type: String },
  level: { type: Number },
  nick_name: { type: String },
  root_id: { type: String },
  uid: { type: String },
  mail_id: { type: String },
});
const emits = defineEmits<{
  (e: "reply", root_id: string, last_id: string, last_nick_name: string, content: string): void;
}>();

defineOptions({ name: "CommentItem" });
const clsBlockName = "comment-item";

const replyList = ref<PublicLetterCommentItem[]>([]);

const { t, locale } = useI18n();
dayjs.locale(locale.value === "zh_CN" ? "zh-cn" : "en");
dayjs.extend(localeData);
dayjs.extend(relativeTime);

const _createdAt = computed(() => {
  return props.created_at ? dayjs().to(dayjs(props.created_at)) : "";
});

const handleReply = () => {
  emits("reply", props.id, "", props.nick_name, props.content);
};
const onReplyItemReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  emits("reply", root_id, last_id, last_nick_name, content);
};

const loading = ref(false);
const count = ref(0);
const form = ref<PublicLetterCommentSearchParams>(new PublicLetterCommentSearchParams());
const handleSearchReply = async (data?: PublicLetterCommentSearchParams) => {
  try {
    loading.value = true;

    form.value.mail_id = props.mail_id;
    form.value.root_id = props.id;
    form.value.sort = "ASC";
    form.value = { ...form.value, ...data };
    const res = await findPublicLetterCommentList(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    setTimeout(() => {
      if (form.value.pageNum === 1) {
        replyList.value = [];
      }

      for (let i = 0; i < res.data.list.length; i++) {
        const element = res.data.list[i];
        replyList.value.push(element);
      }
      form.value.pageNum = res.data.pageNum;
      form.value.pageSize = res.data.pageSize;
      count.value = res.data.count;
    }, 400);
  } catch (err) {
    msg.error((err as Error).message);
    replyList.value = [];
    count.value = 0;
    form.value.pageNum = 1;
    form.value.pageSize = 10;
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};
</script>
