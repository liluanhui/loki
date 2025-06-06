<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-mail`">
      <div :class="`${clsBlockName}-mail-info`">
        <div class="sender-info">
          <bp-avatar size="large"> </bp-avatar>
          <div class="sender-name">
            <span class="sender-name-inner">{{ "吴亦可" }}</span>
            <span class="sender-name-to">{{ "寄给 Sam" }}</span>
          </div>
        </div>
        <div class="time-ago">
          <span class="send-at">10年前</span>
          <!-- <span class="delive-at">投递于 2025-12-31</span> -->
        </div>
      </div>

      <div :class="`${clsBlockName}-mail-content`">
        <yuque-editor ref="viewerRef" editor-type="viewer"></yuque-editor>
      </div>

      <div :class="`${clsBlockName}-mail-footer`">
        <div class="public-no">
          <span class="public-no-inner">NO.gdmzzx20151641</span>
        </div>
      </div>
    </div>
    <div :class="`${clsBlockName}-comment`">
      <div :class="`${clsBlockName}-comment-header`">
        <span :class="`${clsBlockName}-comment-header-inner`">共 234 条评论</span>
      </div>
      <div :class="`${clsBlockName}-comment-content`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YuqueEditor from "../../../yuque-editor";
import { useRef } from "../../../../use/useCompRef";
import { nextTick, onMounted } from "vue";

defineOptions({ name: "DetailInner" });
const clsBlockName = "detail-inner";

const viewerRef = useRef(YuqueEditor);

onMounted(() => {
  nextTick(() => {
    viewerRef.value?.setViewerContent(
      `<p data-lake-id="u2e6b654b" id="u2e6b654b" class="lake-lineheight-25" style="text-align: justify"><span data-lake-id="u42c8663a" id="u42c8663a">2024 年就这么过去了四分之一，最近的一个月，各种各样不好的消息接踵而至，我们每个人，可能过的都不是那么的爽。<br />一方面，国内的畜生已经不分年龄，国外呢，也不太安全；另一方面，我们每个人的不确定性都在不断增加，时代冲击带来的焦虑感越来越发的不可收拾。<br />恰当且足够剂量的焦虑是必要的，它被叫做“危机感”，</span><strong><span data-lake-id="u2b4ed92b" id="u2b4ed92b">没有危机感的人注定是变成无用之人的行尸走肉</span></strong><span data-lake-id="uf1304259" id="uf1304259">。</span></p><p data-lake-id="u4a03deeb" id="u4a03deeb" class="lake-lineheight-25" style="text-align: justify"><span data-lake-id="u4a325939" id="u4a325939">从今年开始，我要求自己每周要写一篇文章，并在每个月的月底，写一篇自己的总结，内容不限，字数随意，总之，就是要倒逼自己每天都要有所积累，然后把自己积累的东西，从学到、选择、相信，到践行之后，分享出去。</span><span data-lake-id="u4e83d057" id="u4e83d057"><br /></span><span data-lake-id="ub78dbc8b" id="ub78dbc8b">不知不觉，这已经轻松坚持下来了。</span><span data-lake-id="u3c9f0883" id="u3c9f0883"><br /></span><span data-lake-id="u35fb828a" id="u35fb828a">从四月开始，我将开启我接下来的几个计划，具体是什么，我先按此不表，会在每个月的最后一天，跟你汇报。</span><span data-lake-id="u80ad9939" id="u80ad9939"><br /></span><span data-lake-id="u79b1444e" id="u79b1444e">所以，我 2024 年的第 </span><strong><span data-lake-id="ucd3764d1" id="ucd3764d1">13</span></strong><span data-lake-id="u13d10c91" id="u13d10c91"> 篇原创文章，来到我的三月份总结，向第一季度，挥手作别。</span></p>`
    );
  });
});
</script>
