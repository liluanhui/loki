<template>
  <div :class="cls">
    <div v-for="v in optionList" :class="[`${clsBlockName}-item`, { active: model === v[value] }]" @click="onSelect(v)">{{ v[label] }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const model = defineModel({ default: "" });
const props = defineProps({
  optionList: { type: Array, default: () => [] },
  size: { type: String, default: "default" },
  theme: { type: String as PropType<"default" | "gray">, default: "default" },
  label: { type: String, default: "label" },
  value: { type: String, default: "value" },
});

defineOptions({ name: "RadioBar" });
const clsBlockName = "radio-bar";

const cls = computed(() => {
  return [clsBlockName, `${clsBlockName}-theme-${props.theme}`, `${clsBlockName}-size-${props.size}`];
});

const onSelect = (item: any) => {
  model.value = item[props.value];
};
</script>
