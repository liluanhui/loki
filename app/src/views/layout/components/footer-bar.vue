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
          <li class="link-item">作者博客</li>
        </ul>
      </div>

      <div class="second">
        <span class="link-header">
          邮局数据
          <bp-tooltip content="投递统计非实时，目前为24h/次" theme="light">
            <IconInformationLine size="14" />
          </bp-tooltip>
        </span>

        <div class="open-time">未来邮局已营业 <span class="number">206</span> 天</div>
        <div class="mail-statistic">
          <bp-statistic v-model="a" show-separator animation unit="封" font-size="24px">
            <template #prefix>已完成投递</template>
          </bp-statistic>
          <bp-statistic v-model="b" show-separator animation unit="封" font-size="24px">
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
import { ref } from "vue";

defineOptions({ name: "FooterBar" });
const clsBlockName = "footer-bar";

const a = ref(10244);
const b = ref(322);
</script>
