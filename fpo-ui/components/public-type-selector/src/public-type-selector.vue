<template>
  <div :class="clsBlockName">
    <div :class="[`${clsBlockName}-item`, { active: v.type === model }]" v-for="v in publicTypeList" @click="onClick(v)">
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

const onClick = (v: any) => {
  model.value = v.type;
};

const publicTypeList = [
  {
    name: "完全公开",
    type: "full",
  },
  {
    name: "隐私保护",
    type: "privary",
  },
  {
    name: "匿名",
    type: "anonymity",
  },
];
</script>
