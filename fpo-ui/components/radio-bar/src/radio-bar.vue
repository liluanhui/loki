<template>
  <div :class="clsBlockName">
    <div v-for="v in optionList" :class="[`${clsBlockName}-item`, { active: model === v.value }]" @click="onSelect(v)">{{ v.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

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
});

defineOptions({ name: "RadioBar" });
const clsBlockName = "radio-bar";
const onSelect = (item: { label: string; value: string }) => {
  model.value = item.value;
};
</script>
