<template>
  <popup v-model:show="show" position="bottom" :style="{ height: '100%' }" :duration="0.2">
    <div class="popup-header">{{ t("write.editor.draft_box") }} {{ total > 0 ? `(${total})` : "" }}</div>

    <div :class="`${clsBlockName}-body`">
      <pull-refresh v-model="refreshing" :pull-distance="100" @refresh="onRefresh" :success-duration="1000" success-text="刷新成功">
        <vant-list
          v-model:loading="loading"
          :finished
          :offset="10"
          finished-text="没有更多了"
          @load="init({ pageNum: Number(form.pageNum) + 1, pageSize: form.pageSize })">
          <div v-for="v in list" class="draft-item">
            <div class="left" @click="handleSelect(v.id)">
              <div class="title">{{ v.title }}</div>
              <div class="remark">
                <p>{{ t("write.editor.update_at") }} {{ dayjs().to(dayjs(v.updated_at)) }}</p>
                <p>{{ v.word_count }} {{ t("write.editor.words") }}</p>
              </div>
            </div>
            <div class="right">
              <bp-button type="secondary" status="danger" size="small" @click="handleDelete(v.id)">{{ t("common.delete") }}</bp-button>
            </div>
          </div>
        </vant-list>
      </pull-refresh>
    </div>
  </popup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Popup, List as VantList, PullRefresh, showConfirmDialog } from "vant";
import "vant/lib/popup/style/index";
import "vant/lib/list/style/index";
import "vant/lib/pull-refresh/style/index";
import "vant/lib/dialog/style/index";
import { delDraft, findDraftList } from "@loki/odin-api";
import { DraftListItem } from "@loki/odin/src/types/mail/draft";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import { Message } from "birdpaper-ui";

defineOptions({ name: "DraftBoxPopup" });
const clsBlockName = "draft-box-popup";

const emits = defineEmits<{
  (e: "select", id: string): void;
  (e: "close"): void;
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

const refreshing = ref(false);
const loading = ref(true);
const finished = ref(false);
const list = ref<DraftListItem[]>([]);
const init = async (data?: { pageNum: number; pageSize: number }) => {
  try {
    loading.value = true;
    form.value = {...form.value, ...data };
    const res = await findDraftList(form.value);
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
      total.value = res.data.count;
      finished.value = form.value.pageNum * form.value.pageSize >= total.value;
    }, 400);
  } catch (err) {
    Message.error((err as Error).message);
    list.value = [];
    total.value = 0;
    form.value.pageNum = 1;
    form.value.pageSize = 10;
  } finally {
    setTimeout(() => {
      refreshing.value = false;
      loading.value = false;
    }, 400);
  }
};
const onRefresh = () => {
  form.value.pageNum = 1;
  form.value.pageSize = 10;
  init();
};

const handleSelect = (id: string) => {
  emits("select", id);
  emits("close");
};

const handleDelete = async (id: string) => {
  showConfirmDialog({
    message: t("write.editor.confirm_delete"),
    confirmButtonText: t("common.confirm"),
    cancelButtonText: t("common.cancel"),
    confirmButtonColor: "#ff7d00",
  })
    .then(async () => {
      try {
        const res = await delDraft({ id });
        if (res.code != 0) {
          throw new Error(res.msg);
        }
        for (let i = 0; i < list.value.length; i++) {
          const element = list.value[i];
          if (element.id === id) {
            list.value.splice(i, 1);
            total.value--;
            break;
          }
        }
        Message.success(res.msg);
        return true;
      } catch (err) {
        Message.error((err as Error).message);
        return false;
      }
    })
    .catch(() => {});
};

const show = ref(false);
const open = () => {
  show.value = true;
  init();
};

defineExpose({
  open,
  close: () => {
    show.value = false;
  },
});
</script>
