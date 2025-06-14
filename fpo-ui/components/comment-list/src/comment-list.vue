<template>
  <div :class="clsBlockName">
    <div v-if="!hideHeader" :class="`${clsBlockName}-header`">
      <span :class="`${clsBlockName}-header-inner`">
        共 {{ count || 0 }} 条评论
        <bp-link size="small" @click="onRefresh">刷新</bp-link>
      </span>
    </div>
    <pull-refresh v-model="refreshing" :pull-distance="100" @refresh="onRefresh" :success-duration="1000" success-text="刷新成功">
      <skeleton title avatar :row="4" animate :loading="loading && form.pageNum === 1 && !refreshing">
        <vant-list
          v-model:loading="loading"
          :finished
          :offset="10"
          finished-text="没有更多了"
          @load="init(form.mail_id, { pageNum: Number(form.pageNum) + 1, pageSize: form.pageSize })">
          <comment-item
            v-for="(item, index) in list"
            :ref="(el) => getItemRef(el, index)"
            v-bind="item"
            :key="`comment-${index}`"
            :mail_id="form.mail_id"
            @reply="onReply" />
        </vant-list>
      </skeleton>
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { msg } from "../../../fpo-ui";
import { List as VantList, PullRefresh, Skeleton } from "vant";
import "vant/lib/list/style/index";
import "vant/lib/skeleton/style/index";
import "vant/lib/pull-refresh/style/index";
import commentItem from "./components/comment-item.vue";
import { findPublicLetterCommentList } from "@loki/odin-api/publicLetter/comment";
import { PublicLetterCommentItem, PublicLetterCommentSearchParams } from "@loki/odin/src/types/publicLetter/comment";

const props = defineProps({
  hideHeader: { type: Boolean, default: false },
})
const emits = defineEmits<{
  (e: "reply", root_id: string, last_id: string, last_nick_name: string, content: string): void;
}>();

defineOptions({ name: "CommentList" });
const clsBlockName = "comment-list";

const loading = ref(false);
const refreshing = ref(false);
const finished = ref(false);

const form = ref<PublicLetterCommentSearchParams>(new PublicLetterCommentSearchParams());
const list = ref<PublicLetterCommentItem[]>([]);
const count = ref(0);

const itemRefList = ref<any[]>([]);
const getItemRef = (el: any, index: number) => {
  if (el) {
    itemRefList.value[index] = el;
  }
};

const onRefresh = () => {
  form.value.pageNum = 1;
  form.value.pageSize = 10;
  init(form.value.mail_id);
};

const init = async (id: string, data?: PublicLetterCommentSearchParams) => {
  if (!id) return;

  try {
    loading.value = true;

    form.value.mail_id = id;
    form.value = { ...form.value, ...data };
    const res = await findPublicLetterCommentList(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    setTimeout(() => {
      if (form.value.pageNum === 1) {
        list.value = [];
      }

      for (let i = 0; i < res.data.list.length; i++) {
        const element = res.data.list[i];
        list.value.push(element);
      }
      form.value.pageNum = res.data.pageNum;
      form.value.pageSize = res.data.pageSize;
      count.value = res.data.count;
      finished.value = form.value.pageNum * form.value.pageSize >= count.value;
    }, 400);
  } catch (err) {
    msg.error((err as Error).message);
    list.value = [];
    count.value = 0;
    form.value.pageNum = 1;
    form.value.pageSize = 10;
  } finally {
    setTimeout(() => {
      refreshing.value = false;
      loading.value = false;
    }, 400);
  }
};

const onReply = (root_id: string, last_id: string, last_nick_name: string, content: string) => {
  emits("reply", root_id, last_id, last_nick_name, content);
};

const updateItemChild = (data: PublicLetterCommentItem) => {
  const { root_id } = data;

  for (let i = 0; i < list.value.length; i++) {
    const element = list.value[i];
    if (element.id === root_id) {
      if (itemRefList.value[i]?.replyList.length > 0) {
        itemRefList.value[i]?.replyList.push(data);
      }

      list.value[i].comments++;
      break;
    }
  }
};

defineExpose({
  init,
  count,
  list,
  updateItemChild,
});
</script>
