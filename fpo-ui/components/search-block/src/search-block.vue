<template>
  <div :class="[clsBlockName, isFocus && `${clsBlockName}-focus`]">
    <IconSearch2Line />

    <div :class="`${clsBlockName}-input`">
      <input v-model="text" type="text" placeholder="查询信件｜单号｜邮箱地址" @focus="isFocus = true" @blur="isFocus = false" />
    </div>

    <div :class="`${clsBlockName}-tip`">
      <shortcut-key :keys="['⌘', 'K']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import shortcutKey from "../../shortcut-key/src/shortcut-key.vue";

defineOptions({ name: "SearchBlock" });
const clsBlockName = "search-block";

const text = ref("");
// const text = ref("SF12398789327509423");
const isFocus = ref(false);
</script>
