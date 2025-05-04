<template>
  <div :class="clsBlockName">
    <div :class="[`${clsBlockName}-item`, { active: v.type === model }]" v-for="v in list" @click="onClick(v)">
      <div :class="`${clsBlockName}-item-title`">{{ v.name }}</div>
      <letter-item size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import letterItem from "../../letter-item";

defineOptions({ name: "publicTypeSelector" });
const clsBlockName = "public-type-selector";

const model = defineModel({ type: String, default: "full" });
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const onClick = (v: any) => {
  model.value = v.type;
};
</script>
