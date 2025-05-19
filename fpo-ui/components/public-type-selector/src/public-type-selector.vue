<template>
  <div :class="[clsBlockName, `${clsBlockName}-${layout}`]">
    <div :class="[`${clsBlockName}-item`, { active: v.type === model }]" v-for="v in list" @click="onClick(v)">
      <div :class="`${clsBlockName}-item-title`">{{ v.name }}</div>
      <letter-item size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import letterItem from "../../letter-item";

defineOptions({ name: "publicTypeSelector" });
const clsBlockName = "public-type-selector";

const model = defineModel({ type: String, default: "full" });
const props = defineProps({
  layout: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
  },
  list: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String as PropType<"self" | "email">,
    default: "self",
  },
  avatar: {
    type: String,
    default: "",
  },
  nickName: {
    type: String,
    default: "",
  },
  delivery_time: {
    type: String,
    default: "",
  },
  recipient_name: {
    type: String,
    default: "",
  },
});

const onClick = (v: any) => {
  model.value = v.type;
};
</script>
