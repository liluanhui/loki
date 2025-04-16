<template>
  <div :class="[clsBlockName, isFocus && `${clsBlockName}-focus`]">
    <IconSearch2Line size="23" />
    <!-- <IconLoader5Line size="23" spin /> -->

    <div :class="`${clsBlockName}-input`">
      <!-- <input v-model="text" type="text" placeholder="Search invoice number" /> -->
      <input v-model="text" type="text" placeholder="查询信件｜单号｜邮箱地址" @focus="isFocus = true" @blur="isFocus = false" />
    </div>

    <div :class="`${clsBlockName}-tip`">
      <div class="shortcut-group">
        <div class="shortcut-key">⌘</div>
        <div class="shortcut-split">+</div>
        <div class="shortcut-key">K</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "SearchBlock" });
const clsBlockName = "search-block";

const text = ref("");
// const text = ref("SF12398789327509423");
const isFocus = ref(false);
</script>
