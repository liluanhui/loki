<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-header`">
      <radio-bar v-model="form.sort" :option-list="radioBarList"></radio-bar>
      <bp-button
        v-if="appMode === 'pc'"
        :icon="IconRefreshLine"
        status="gray"
        type="plain"
        shape="circle"
        @click="init({ pageNum: 1, pageSize: 36 })"></bp-button>
    </div>
    <div class="mt-20px">
      <letter-wall
        ref="letterWallRef"
        :list
        :finished
        :page-num="Number(form.pageNum)"
        :page-size="Number(form.pageSize)"
        @on-detail="onDetail"
        @on-refresh="init" />
    </div>

    <letter-detail ref="letterDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onMounted, ref, watch } from "vue";
import { IconRefreshLine } from "birdpaper-icon";
import letterWall from "./components/letter-wall.vue";
import { PublicLetterSearchParams } from "@loki/odin/src/types/publicLetter";
import { Message } from "birdpaper-ui";
import { findPublicLetterList } from "@loki/odin-api/publicLetter";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import letterDetail from "@loki/fpo-ui/components/letter-detail";
import { useStorage } from "@vueuse/core";

defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";

const mobileBarCtx: any = inject("mobile-bar");
mobileBarCtx?.change("menus");

const radioBarList = [
  { label: "最新", value: "created_at" },
  { label: "最多点赞", value: "likes" },
  { label: "最多评论", value: "comments" },
];

const finished = ref(false);
const letterWallRef = useRef(letterWall);

const list = ref([]);
const count = ref(0);
const form = ref<PublicLetterSearchParams>(new PublicLetterSearchParams());
const init = async (data?: { pageNum: number; pageSize: number }) => {
  try {
    letterWallRef.value.loading = true;
    form.value = { ...form.value, ...data };
    if (form.value.pageNum === 1) {
      list.value = [];
    }

    const res = await findPublicLetterList(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }

    list.value = [...list.value, ...res.data.list];
    form.value.pageNum = res.data.pageNum;
    form.value.pageSize = res.data.pageSize;
    count.value = res.data.count;
    finished.value = list.value.length >= count.value;
  } catch (err) {
    Message.error((err as Error).message);
  } finally {
    setTimeout(() => {
      letterWallRef.value.loading = false;
      letterWallRef.value.refreshing = false;
    }, 800);
  }
};

onMounted(() => {
  nextTick(() => {
    init({ pageNum: 1, pageSize: 36 });
  });
});

const appMode = useStorage("app-mode", "pc");

const letterDetailRef = useRef(letterDetail);
const onDetail = (id: string) => {
  letterDetailRef.value.open(id);
};

watch(
  () => form.value.sort,
  (newVal) => {
    if (newVal) {
      init({ pageNum: 1, pageSize: 36 });
    }
  }
);
</script>
