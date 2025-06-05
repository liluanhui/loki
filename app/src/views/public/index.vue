<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-header`">
      <radio-bar v-model="form.sort" :option-list="radioBarList"></radio-bar>
      <bp-button :icon="IconRefreshLine" status="gray" type="plain" shape="circle"></bp-button>
    </div>
    <div class="mt-20px">
      <letter-wall v-if="list.length > 0" :list @on-detail="onDetail" />
    </div>

    <letter-detail ref="letterDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { IconRefreshLine } from "birdpaper-icon";
import letterWall from "./components/letter-wall.vue";
import { PublicLetterSearchParams } from "@loki/odin/src/types/publicLetter";
import { Message } from "birdpaper-ui";
import { findPublicLetterList } from "@loki/odin-api/publicLetter";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import letterDetail from "@loki/fpo-ui/components/letter-detail";

defineOptions({ name: "PublicPage" });
const clsBlockName = "public-page";

const mobileBarCtx: any = inject("mobile-bar");
mobileBarCtx?.change("menus");

const radioBarList = [
  { label: "最新", value: "created_at" },
  { label: "最多点赞", value: "like" },
  { label: "最多评论", value: "comment" },
];

const list = ref([]);
const count = ref(0);
const form = ref<PublicLetterSearchParams>(new PublicLetterSearchParams());
const init = async () => {
  try {
    const res = await findPublicLetterList(form.value);
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    list.value = res.data.list;
    count.value = res.data.count;
  } catch (err) {
    Message.error((err as Error).message);
  }
};

init();

const letterDetailRef = useRef(letterDetail);
const onDetail = (id: string) => {
  letterDetailRef.value.open(id);
};
</script>
