<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-option`"></div>

      <div :class="`${clsBlockName}-editor`">
        <div :class="`${clsBlockName}-header`">
          <div class="header-left">
            <bp-link :icon="IconDraftLine" size="small">{{ t("write.editor.draft_box") }}</bp-link>
          </div>
          <div class="header-right">
            <bp-button :icon="IconSaveLine" size="small" type="text">{{ t("write.editor.draft_text") }}</bp-button>
            <bp-button :icon="IconSendPlaneFill" size="small" type="plain">{{ t("write.editor.send_text") }}</bp-button>
          </div>
        </div>

        <div :class="`${clsBlockName}-form`">
          <bp-row style="width: 100%">
            <bp-col :span="15">
              <div :class="`${clsBlockName}-form-item no-line`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.type }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <radio-bar v-model="current" theme="gray" size="small" :option-list="radioBarList"></radio-bar>
                </div>
              </div>
            </bp-col>
            <bp-col :span="9">
              <div :class="`${clsBlockName}-form-item no-line justify-end!`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.isPublic }}</label>
                <div :class="`${clsBlockName}-form-item-content`" style="flex: none">
                  <bp-switch v-model="isPublic"></bp-switch>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <bp-row style="width: 100%" :gutter="16">
            <bp-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.title }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable :maxlength="25" show-limit> </bp-input>
                </div>
              </div>
            </bp-col>
            <bp-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.delivery_time }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-date-picker :style="{ width: '100%' }" value-format="YYYY-MM-DD"></bp-date-picker>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <bp-row style="width: 100%" :gutter="16" v-if="current === 'email'">
            <bp-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.recipient_email }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable> </bp-input>
                </div>
              </div>
            </bp-col>
            <bp-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.recipient_name }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable> </bp-input>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <bp-row style="width: 100%" v-if="isPublic">
            <bp-col :span="24">
              <div v-if="isPublic" :class="`${clsBlockName}-form-item no-line public-config`" style="align-items: flex-start">
                <label :class="`${clsBlockName}-form-item-label`">{{ formField.public_type }}</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <public-type-selector v-model="public_type" :list="publicTypeList" style="margin-top: 8px" />

                  <!-- Mobile -->
                  <div class="public-type-selector-mobile">
                    <span>{{ publicTypeList.find((v) => v.type === public_type).name }}</span>
                    <bp-button type="text" size="small" @click="showPublicConfig">{{ t("write.editor.public_config_text") }}</bp-button>
                  </div>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <div :class="`${clsBlockName}-form-item no-line column-layout`">
            <yuque-editor ref="editorRef" :placeholder="t('write.editor.placeholder')" :paragraph-tip="''"></yuque-editor>
            <span class="word-count">{{ t("write.editor.word_count") + t("common.field_colon") }} {{ editorRef?.wordCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <popup
      v-model:show="showPublicConfigPopup"
      position="bottom"
      :style="{ height: '440px' }"
      :duration="0.2"
      round
      safe-area-inset-bottom
      @close="hidePublicConfig">
      <div class="public-type-selector-popup">
        <public-type-selector v-model="public_type" layout="vertical" :list="publicTypeList" />
      </div>
    </popup>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { IconSendPlaneFill, IconSaveLine, IconDraftLine } from "birdpaper-icon";

defineOptions({ name: "WritePage" });
const clsBlockName = "write-page";

const mobileBarCtx: any = inject("mobile-bar");
mobileBarCtx?.change("write");

const editorRef = ref();
const current = ref("email");
const isPublic = ref(true);
const public_type = ref("full");

const { t } = useI18n();

// Public type selector options
const publicTypeList = [
  {
    name: t("public-type-selector.full"),
    type: "full",
  },
  {
    name: t("public-type-selector.privary"),
    type: "privary",
  },
  {
    name: t("public-type-selector.private"),
    type: "anonymity",
  },
];

// Form field labels
const createFormField = (key: string) => t(`write.editor.${key}`) + t("common.field_colon");
const formField = {
  type: createFormField("send_field"),
  isPublic: createFormField("is_public"),
  title: createFormField("title"),
  delivery_time: createFormField("delivery_time"),
  recipient_email: createFormField("recipient_email"),
  recipient_name: createFormField("recipient_name"),
  public_type: createFormField("public_type"),
};

// Radio bar options
const radioBarList = [
  {
    label: t("write.editor.send_type.self"),
    value: "self",
  },
  {
    label: t("write.editor.send_type.other"),
    value: "email",
  },
];

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
  mobileBarCtx?.change("write");
};
</script>
