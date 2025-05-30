<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-option`"></div>

      <bp-spin :spinning="loading" :description="t('write.editor.loading_text')">
        <div :class="`${clsBlockName}-editor`">
          <div class="mask-disabled" v-if="!isLogin()">
            <bp-button type="plain" shape="round" @click="handleLoginClick">{{ t("common.login_now") }}</bp-button>
          </div>

          <div :class="`${clsBlockName}-header`">
            <div class="header-left">
              <bp-link :icon="IconDraftLine" size="small" @click="openDraftBox">{{ t("write.editor.draft_box") }}</bp-link>
            </div>
            <div class="header-right">
              <bp-button :icon="IconSaveLine" :loading="draftLoading" :disabled="btnDisabled" size="small" type="text" @click="saveDraft">
                {{ draftText }}
              </bp-button>
              <bp-button :icon="IconSendPlaneFill" :disabled="btnDisabled" size="small" type="plain">
                {{ sendText }}
              </bp-button>
            </div>
          </div>

          <div :class="`${clsBlockName}-form`">
            <bp-row style="width: 100%">
              <bp-col :span="15">
                <div :class="`${clsBlockName}-form-item no-line`">
                  <label :class="`${clsBlockName}-form-item-label`">{{ formField.type }}</label>
                  <div :class="`${clsBlockName}-form-item-content`">
                    <radio-bar v-model="form.recipient_type" theme="gray" size="small" :option-list="typeList"></radio-bar>
                  </div>
                </div>
              </bp-col>
              <bp-col :span="9">
                <div :class="`${clsBlockName}-form-item no-line justify-end!`">
                  <label :class="`${clsBlockName}-form-item-label`">{{ formField.isPublic }}</label>
                  <div :class="`${clsBlockName}-form-item-content`" style="flex: none">
                    <bp-switch v-model="form.type" check-value="public" uncheck-value="private"></bp-switch>
                  </div>
                </div>
              </bp-col>
            </bp-row>

            <bp-row style="width: 100%" :gutter="16">
              <bp-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <div :class="`${clsBlockName}-form-item`">
                  <label :class="`${clsBlockName}-form-item-label`">{{ formField.title }}</label>
                  <div :class="`${clsBlockName}-form-item-content`">
                    <bp-input v-model="form.title" clearable :maxlength="25" show-limit> </bp-input>
                  </div>
                </div>
              </bp-col>
              <bp-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div :class="`${clsBlockName}-form-item`">
                  <label :class="`${clsBlockName}-form-item-label`">{{ formField.delivery_time }}</label>
                  <div :class="`${clsBlockName}-form-item-content`">
                    <bp-date-picker v-model="form.plan_deliver_at" :style="{ width: '100%' }" value-format="YYYY-MM-DD"></bp-date-picker>
                  </div>
                </div>
              </bp-col>
            </bp-row>

            <transition mode="out-in" name="fade">
              <bp-row style="width: 100%" :gutter="16" v-if="form.recipient_type === 'email'">
                <bp-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                  <div :class="`${clsBlockName}-form-item`">
                    <label :class="`${clsBlockName}-form-item-label`">{{ formField.recipient_email }}</label>
                    <div :class="`${clsBlockName}-form-item-content`">
                      <bp-input v-model="form.recipient_email" clearable> </bp-input>
                    </div>
                  </div>
                </bp-col>
                <bp-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                  <div :class="`${clsBlockName}-form-item`">
                    <label :class="`${clsBlockName}-form-item-label`">{{ formField.recipient_name }}</label>
                    <div :class="`${clsBlockName}-form-item-content`">
                      <bp-input v-model="form.recipient_name" clearable> </bp-input>
                    </div>
                  </div>
                </bp-col>
              </bp-row>
            </transition>

            <transition mode="out-in" name="fade">
              <bp-row style="width: 100%" v-if="form.type === 'public'">
                <bp-col :span="24">
                  <div :class="`${clsBlockName}-form-item no-line public-config`" style="align-items: flex-start">
                    <label :class="`${clsBlockName}-form-item-label`">{{ formField.public_type }}</label>
                    <div :class="`${clsBlockName}-form-item-content`">
                      <public-type-selector
                        ref="publicTypeSelectorRef"
                        v-model="form.public_type"
                        v-bind="publicTypeSelectorAttr"
                        style="margin-top: 8px" />

                      <!-- Mobile -->
                      <div class="public-type-selector-mobile">
                        <span>{{ publicTypeSelectorRef?.list.find((v) => v.type === form.public_type).name }}</span>
                        <bp-button type="text" size="small" @click="showPublicConfig">{{ t("write.editor.public_config_text") }}</bp-button>
                      </div>
                    </div>
                  </div>
                </bp-col>
              </bp-row>
            </transition>

            <div :class="`${clsBlockName}-form-item no-line column-layout`">
              <yuque-editor
                ref="editorRef"
                :placeholder="t('write.editor.placeholder')"
                :paragraph-tip="''"
                @change="onEditorChange"></yuque-editor>
              <span class="word-count">{{ t("write.editor.word_count") + t("common.field_colon") }} {{ editorRef?.wordCount }}</span>
            </div>
          </div>
        </div>
      </bp-spin>
    </div>

    <popup
      v-model:show="showPublicConfigPopup"
      position="bottom"
      :style="{ height: '460px' }"
      :duration="0.2"
      round
      safe-area-inset-bottom
      @close="hidePublicConfig">
      <div class="public-type-selector-popup">
        <public-type-selector ref="publicTypeSelectorRef" v-model="form.public_type" layout="vertical" v-bind="publicTypeSelectorAttr" />
      </div>
    </popup>

    <!-- 草稿箱 -->
    <draft-box ref="draftBoxRef" @select="onDraftSelect" />
    <draft-box-popup ref="draftBoxPopupRef" @select="onDraftSelect" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { useUserStore } from "@/stores/useUser";
import { IconSendPlaneFill, IconSaveLine, IconDraftLine } from "birdpaper-icon";
import { useWrite } from "@/use/useWrite";
import draftBox from "./components/draft-box.vue";
import draftBoxPopup from "./components/draft-box-popup.vue";

defineOptions({ name: "WritePage" });
const clsBlockName = "write-page";

const { t } = useI18n();
const editorRef = ref();
const mobileBarCtx: any = inject("mobile-bar");
const { userInfo, isLogin } = useUserStore();
const { form, formField, typeList, loading, draftLoading, sendLoading, draftText, sendText, btnDisabled, saveDraft, loadDraft } =
  useWrite();

const initMobileBar = () => {
  mobileBarCtx?.change("write", {
    props: {
      draftLoading,
      sendLoading,
      draftText,
      sendText,
      btnDisabled,
    },
    events: {
      saveDraft: () => saveDraft(),
      send: () => {
        console.log("send");
      },
      openDraftBox: () => {
        openDraftBoxPopup();
      },
    },
  });
};

const onEditorChange = (data: { content: string; wordCount: number }) => {
  form.value.content = data.content;
  form.value.word_count = data.wordCount;
};

/** 公开类型选择器配置 */
const publicTypeSelectorRef = ref();
const publicTypeSelectorAttr = computed(() => {
  return {
    type: form.value.recipient_type,
    avatar: userInfo.avatar,
    nickName: userInfo.nick_name,
    deliveryTime: form.value.plan_deliver_at,
    recipientName: form.value.recipient_name,
  };
});

/** 移动端-公开类型选择器 */
const showPublicConfigPopup = ref(false);
const showPublicConfig = () => {
  showPublicConfigPopup.value = true;
  mobileBarCtx?.change("confirm", {
    events: {
      close: () => hidePublicConfig(),
      confirm: () => {
        console.log("Yes");
      },
    },
  });
};
const hidePublicConfig = () => {
  showPublicConfigPopup.value = false;
  initMobileBar();
};

const accountCtx = ref(inject("account", undefined));
const handleLoginClick = () => {
  if (!isLogin()) {
    accountCtx.value.login();
    return;
  }
};

const draftBoxRef = ref();
const draftBoxPopupRef = ref();
const openDraftBoxPopup = () => {
  draftBoxPopupRef.value.open();
  mobileBarCtx?.change("close", {
    events: {
      close: () => {
        draftBoxPopupRef.value.close();
        initMobileBar();
      },
    },
  });
};
const openDraftBox = () => {
  draftBoxRef.value.open();
};
const onDraftSelect = (id: string) => {
  loadDraft(id).then(() => {
    nextTick(() => {
      editorRef.value?.setContent(form.value.content);
    });
  });
};

onMounted(() => {
  nextTick(() => initMobileBar());
});
</script>
