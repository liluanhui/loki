<template>
  <pull-refresh v-model="refreshing" :pull-distance="100" @refresh="onRefresh" :success-duration="1000" success-text="刷新成功">
    <vant-list
      v-model:loading="loading"
      :finished
      :offset="10"
      finished-text="没有更多了"
      :class="clsBlockName"
      v-masonry="20"
      column-width=".letter-item"
      transition-duration="0s"
      :horizontal-order="true"
      :gutter="14"
      fit-width>
      <letter-item v-masonry-tile v-for="(item, index) in list" :key="index" v-bind="item" @click="onClick(item.id)" />
    </vant-list>
  </pull-refresh>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { List as VantList, PullRefresh } from "vant";
import "vant/lib/list/style/index";
import "vant/lib/pull-refresh/style/index";
import { useStorage } from "@vueuse/core";

defineOptions({ name: "LetterWall" });
const clsBlockName = "letter-wall";

const props = defineProps({
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
const emits = defineEmits(["on-detail"]);

const refreshing = ref(false);
const loading = ref(true);
const finished = ref(false);

const appMode = useStorage("app-mode", "pc");

const onRefresh = () => {};

const onClick = (id: string) => {
  emits("on-detail", id);
};
</script>
