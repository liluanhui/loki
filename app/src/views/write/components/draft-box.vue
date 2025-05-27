<template>
  <bp-modal v-model="show" title="草稿箱" :show-border="false" width="720px">
    <div :class="`${clsBlockName}-body`">
      <bp-empty v-if="list.length === 0" />

      <div v-else v-for="v in list" :class="`${clsBlockName}-item`">
        <div class="left">
          <div class="title">{{ v.title }}</div>
          <div class="remark">
            <p>3 天前</p>
            <p>{{ v.word_count }} {{ t("write.editor.words") }}</p>
          </div>
        </div>
        <div class="right">
          <bp-popconfirm position="left" content="确定删除草稿吗？">
            <bp-button type="text" size="small">删除</bp-button>
          </bp-popconfirm>
        </div>
      </div>
    </div>
    <div :class="`${clsBlockName}-footer`">
      <bp-pagination size="small" layout="prev,pager,next" :total="20"></bp-pagination>
    </div>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { findDraftList } from "@loki/odin-api";
import { DraftListItem } from "@loki/odin/src/types/mail/draft";
import { useI18n } from "vue-i18n";

defineOptions({ name: "DraftBox" });
const clsBlockName = "draft-box";

const total = ref(0);
const form = ref({
  pageNum: 1,
  pageSize: 10,
});
const list = ref<DraftListItem[]>([]);
const init = async () => {
  const res = await findDraftList(form.value);
  if (res.code != 0) {
    throw new Error(res.msg);
  }
  list.value = res.data.list;
  form.value.pageNum = res.data.pageNum;
  form.value.pageSize = res.data.pageSize;
  total.value = res.data.total;
};

const { t } = useI18n();
const show = ref(false);
const open = () => {
  show.value = true;
  init();
};

defineExpose({
  open,
});
</script>
