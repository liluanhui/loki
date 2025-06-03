<template>
  <footer :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <div class="first">
        <the-logo only-icon />

        <ul class="link-area">
          <span class="link-header">更多</span>
          <li class="link-item">友情链接</li>
          <li class="link-item">关于邮局</li>
          <li class="link-item">支持&赞助</li>
        </ul>
        <ul class="link-area">
          <span class="link-header">其它</span>
          <li class="link-item font-quick font-600">BirdpaperUI</li>
          <li class="link-item font-quick font-600">BirdpaperICON</li>
          <li class="link-item">博客</li>
        </ul>
      </div>

      <div class="second">
        <span class="link-header">
          邮局数据
          <bp-tooltip content="目前统计为实时统计" theme="light">
            <IconInformationLine size="14" />
          </bp-tooltip>
        </span>

        <div class="open-time">
          未来邮局已营业 <span class="number">{{ siteStatistic.operateTime }}</span> 天
        </div>
        <div class="mail-statistic">
          <bp-statistic v-model="siteStatistic.success" show-separator animation unit="封" font-size="24px">
            <template #prefix>已完成投递</template>
          </bp-statistic>
          <bp-statistic v-model="siteStatistic.wait" show-separator animation unit="封" font-size="24px">
            <template #prefix>待投递</template>
          </bp-statistic>
        </div>
      </div>
    </div>
  </footer>
  <div :class="`${clsBlockName}-number`">
    <div class="tag">F.P.O</div>
    <div class="copyright">Copyright © 2025 |</div>
    <bp-link status="gray" size="mini" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备17015354号</bp-link>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { getStatistic } from "@loki/odin-api/common/index";
import { Message } from "birdpaper-ui";
import { StatisticRes } from "@loki/odin/src/types/common";
import { useStorage } from "@vueuse/core";

defineOptions({ name: "FooterBar" });
const clsBlockName = "footer-bar";

const siteStatistic = ref<StatisticRes>({
  operateTime: 0,
  success: 0,
  wait: 0,
});

const appMode = useStorage("app-mode", "pc");
const initStatistic = async () => {
  try {
    const res = await getStatistic();
    if (res.code != 0) {
      throw new Error(res.msg);
    }
    siteStatistic.value = res.data;
  } catch (err) {
    Message.error((err as Error).message);
  }
};
watch(
  () => appMode.value,
  () => {
    if (appMode.value !== "mobile") {
      initStatistic();
    }
  },
  { immediate: true }
);
</script>
