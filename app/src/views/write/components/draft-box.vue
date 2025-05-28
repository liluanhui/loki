<template>
  <bp-modal
    v-model="show"
    :title="`${t('write.editor.draft_box')} ${total > 0 ? `(${total})` : ''}`"
    :show-border="false"
    width="720px"
    hide-footer>
    <bp-spin :spinning="loading">
      <div :class="`${clsBlockName}-body`">
        <bp-empty v-if="list.length === 0" />
  
        <div v-else v-for="v in list" :class="`${clsBlockName}-item`">
          <div class="left" @click="handleSelect(v.id)">
            <div class="title">{{ v.title }}</div>
            <div class="remark">
              <p>{{ t("write.editor.update_at") }} {{ dayjs().to(dayjs(v.updated_at)) }}</p>
              <p>{{ v.word_count }} {{ t("write.editor.words") }}</p>
            </div>
          </div>
          <div class="right">
            <bp-popconfirm
              position="left"
              :content="t('write.editor.confirm_delete')"
              :ok-text="t('common.confirm')"
              :cancel-text="t('common.cancel')"
              :onBeforeOk="() => handleDelete(v.id)">
              <bp-button type="text" size="small">{{ t("common.delete") }}</bp-button>
            </bp-popconfirm>
          </div>
        </div>
      </div>
    </bp-spin>
    <div :class="`${clsBlockName}-footer`">
      <bp-pagination
        size="small"
        layout="prev,pager,next"
        :total
        @change="init({ pageNum: $event, pageSize: 10 })"
        @size-change="init({ pageNum: 1, pageSize: $event })"></bp-pagination>
    </div>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { delDraft, findDraftList } from "@loki/odin-api";
import { DraftListItem } from "@loki/odin/src/types/mail/draft";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import { Message } from "birdpaper-ui";

defineOptions({ name: "DraftBox" });
const clsBlockName = "draft-box";

const emits = defineEmits<{
  (e: "select", id: string): void;
}>();

const { t, locale } = useI18n();
dayjs.locale(locale.value === "zh_CN" ? "zh-cn" : "en");
dayjs.extend(localeData);
dayjs.extend(relativeTime);

const total = ref(0);
const form = ref({
  pageNum: 1,
  pageSize: 10,
});

const loading = ref(false);
const list = ref<DraftListItem[]>([]);
const init = async (data?: { pageNum: number; pageSize: number }) => {
  try {
    loading.value = true;
    const res = await findDraftList({ ...form.value, ...data });
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    list.value = res.data.list;
    form.value.pageNum = res.data.pageNum;
    form.value.pageSize = res.data.pageSize;
    total.value = res.data.count;
  } catch (err) {
    Message.error((err as Error).message);
    list.value = [];
    total.value = 0;
    form.value.pageNum = 1;
    form.value.pageSize = 10;
  } finally {
    loading.value = false;
  }
};

const handleSelect = (id: string) => {
  emits("select", id);
  show.value = false;
};

const handleDelete = async (id: string) => {
  try {
    const res = await delDraft({ id });
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    Message.success(res.msg);
    init();
    return true;
  } catch (err) {
    Message.error((err as Error).message);
    return false;
  }
};

const show = ref(false);
const open = () => {
  show.value = true;
  init();
};

defineExpose({
  open,
});
</script>
