<template>
  <div :class="[clsBlockName, `${clsBlockName}-${layout}`]">
    <div :class="[`${clsBlockName}-item`, { active: v.type === model }]" v-for="v in list" @click="onClick(v)">
      <div :class="`${clsBlockName}-item-title`">{{ v.name }}</div>
      <letter-item size="small" :mode="v.type" :avatar :nickName :type :deliveryTime :recipientName />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
import letterItem from "../../letter-item";

defineOptions({ name: "publicTypeSelector" });
const clsBlockName = "public-type-selector";

const model = defineModel({ type: String, default: "full" });
const props = defineProps({
  layout: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
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
  deliveryTime: {
    type: String,
    default: "",
  },
  recipientName: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const list = [
  { name: t("public-type-selector.full"), type: "full" },
  { name: t("public-type-selector.privary"), type: "privary" },
  { name: t("public-type-selector.private"), type: "anonymity" },
];

const onClick = (v: any) => {
  model.value = v.type;
};

defineExpose({
  list,
});
</script>
