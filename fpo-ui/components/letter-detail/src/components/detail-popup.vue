<template>
  <popup v-model:show="popupShow" position="bottom" :style="{ height: '100%' }" :duration="0.2" safe-area-inset-bottom @close="close">
    <detail-inner ref="detailInnerRef" is-popup v-bind="letterDetail" :loading />

    <popup
      v-model:show="commentPopupShow"
      position="bottom"
      :style="{ height: '90%' }"
      :duration="0.2"
      round
      safe-area-inset-bottom
      @close="closeCommentPopup">
      <div class="popup-header">评论</div>
      <div style="margin-top: 52px; padding: 0 12px 100px 12px">
        <comment-list ref="commentListRef" hide-header />
      </div>
    </popup>
  </popup>
</template>

<script setup lang="ts">
import { nextTick, inject, ref, watch } from "vue";
import detailInner from "./detail-inner.vue";
import { getPublicLetterDetail } from "@loki/odin-api/publicLetter";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { msg } from "../../../fpo-message";
import { useRef } from "../../../../use/useCompRef";
import { CommentList } from "../../../comment-list";

const popupShow = ref<boolean>(false);
const commentPopupShow = ref<boolean>(false);

const loading = ref<boolean>(false);
const letterDetail = ref<any>(null);
const detailInnerRef = useRef(detailInner);

const loadDetail = async (id: string) => {
  try {
    loading.value = true;
    const res = await getPublicLetterDetail(id);
    if (res.code !== 0) {
      throw new Error(res.msg);
    }

    letterDetail.value = res.data;
    nextTick(() => {
      detailInnerRef.value?.setContent(letterDetail.value.content);
    });
  } catch (err) {
    msg.error((err as Error).message);
  } finally {
    loading.value = false;
  }
};

const commentListRef = useRef(CommentList);
const mobileBarCtx: any = inject("mobile-bar");
const open = (id: string) => {
  popupShow.value = true;
  mobileBarCtx?.change("publicLetter", {
    events: {
      close,
      comment: () => {
        commentPopupShow.value = true;
        mobileBarCtx?.change("close", {
          events: {
            close: () => closeCommentPopup(),
          },
        });
        nextTick(() => {
          // commentListRef.value?.init(id,{pageNum: 1, pageSize: 20});
        });
      },
    },
  });
  loadDetail(id);
};

const close = () => {
  popupShow.value = false;
  mobileBarCtx?.change("menus");
};

const closeCommentPopup = () => {
  commentPopupShow.value = false;
  mobileBarCtx?.reset();
};

watch(popupShow, (val) => {
  if (val) {
    letterDetail.value = null;
  }
});

defineExpose({
  open,
  close,
});
</script>
