<template>
  <div :class="cls">
    <div v-for="v in optionList" :class="[`${clsBlockName}-item`, { active: model === v.value }]" @click="onSelect(v)">{{ v.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const model = defineModel({ default: "" });
const props = defineProps({
  optionList: {
    type: Array as PropType<
      {
        label: string;
        value: string;
      }[]
    >,
    default: () => [],
  },
  size: {
    type: String,
    default: "default",
  },
});

defineOptions({ name: "RadioBar" });
const clsBlockName = "radio-bar";

const cls = computed(() => {
  return [clsBlockName, `${clsBlockName}-size-${props.size}`];
});

const onSelect = (item: { label: string; value: string }) => {
  model.value = item.value;
};
</script>
