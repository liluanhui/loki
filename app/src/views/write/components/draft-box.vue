<template>
  <bp-modal v-model="show" title="草稿箱" :show-border="false" width="720px">
    <div :class="`${clsBlockName}-body`">
      <!-- <bp-empty /> -->
      <div v-for="v in 10" :class="`${clsBlockName}-item`">
        <div class="left">
          <div class="title">草稿标题草题草稿标题草稿标题</div>
          <div class="remark">
            <p>3 天前</p>
            <p>256 字</p>
          </div>
        </div>
        <div class="right">
          <bp-button type="text" size="small">删除</bp-button>
        </div>
      </div>
    </div>
  </bp-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "DraftBox" });
const clsBlockName = "draft-box";

const show = ref(false);
const open = () => {
  show.value = true;
};

defineExpose({
  open,
});
</script>
