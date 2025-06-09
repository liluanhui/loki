<template>
  <pull-refresh v-model="refreshing" :pull-distance="100" @refresh="onRefresh" :success-duration="1000" success-text="刷新成功">
    <vant-list
      v-if="list.length > 0"
      v-model:loading="loading"
      :finished
      finished-text="没有更多了"
      :class="clsBlockName"
      @load="emits('on-refresh', { pageNum: Number(pageNum) + 1, pageSize: pageSize })">
      <letter-item v-for="(item, index) in list" :key="item.id" v-bind="item" @click="onClick(item.id)" />
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
  list: { type: Array as PropType<any>, default: () => [] },
  finished: { type: Boolean, default: false },
  pageSize: { type: Number, default: 12 },
  pageNum: { type: Number, default: 1 },
});
const emits = defineEmits(["on-detail", "on-refresh"]);

const loading = ref(true);
const refreshing = ref(true);
const appMode = useStorage("app-mode", "pc");

const onRefresh = () => {};

const onClick = (id: string) => {
  emits("on-detail", id);
};

defineExpose({
  loading,
  refreshing,
});
</script>
