<template>
  <footer :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <div class="first"></div>
      <div class="second">
        未来邮局已开业 <span>206</span> 天
        <bp-statistic v-model="a" show-separator unit="封">
          <template #prefix>已投递</template>
        </bp-statistic>
        <bp-statistic v-model="b" show-separator unit="封">
          <template #prefix>待投递</template>
        </bp-statistic>
      </div>
    </div>
  </footer>
  <div :class="`${clsBlockName}-number`">
    <bp-link status="gray" size="mini" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备17015354号</bp-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineOptions({ name: "FooterBar" });
const clsBlockName = "footer-bar";

const a = ref(10244);
const b = ref(322);
</script>
