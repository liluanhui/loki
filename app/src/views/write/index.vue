<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-banner`"></div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-option`"></div>

      <div :class="`${clsBlockName}-editor`">
        <div :class="`${clsBlockName}-form`">
          <bp-row style="width: 100%">
            <bp-col :span="24">
              <div :class="`${clsBlockName}-form-item no-line`">
                <label :class="`${clsBlockName}-form-item-label`">寄给：</label>
                <div :class="`${clsBlockName}-form-item-content`" style="position: relative; left: -4px">
                  <radio-bar v-model="current" size="small" :option-list="radioBarList"></radio-bar>
                </div>
              </div>
              <div :class="`${clsBlockName}-form-item no-line justify-end!`">
                <label :class="`${clsBlockName}-form-item-label`">是否公开：</label>
                <div :class="`${clsBlockName}-form-item-content`" style="flex: none">
                  <bp-switch v-model="isPublic"></bp-switch>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <bp-row style="width: 100%" :gutter="16" v-if="current === 'email'">
            <bp-col :span="12">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">收件地址：</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable> </bp-input>
                </div>
              </div>
            </bp-col>
            <bp-col :span="12">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">收件人称呼：</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable> </bp-input>
                </div>
              </div>
            </bp-col>
          </bp-row>

          <bp-row style="width: 100%" :gutter="16">
            <bp-col :span="16">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">主题：</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-input clearable :maxlength="25" show-limit> </bp-input>
                </div>
              </div>
            </bp-col>
            <bp-col :span="8">
              <div :class="`${clsBlockName}-form-item`">
                <label :class="`${clsBlockName}-form-item-label`">投递时间：</label>
                <div :class="`${clsBlockName}-form-item-content`">
                  <bp-date-picker :style="{ width: '100%' }" show-time value-format="YYYY-MM-DD HH:mm:ss"></bp-date-picker>
                </div>
              </div>
            </bp-col>
          </bp-row>
          <!-- <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">是否公开</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-switch v-model="isPublic"></bp-switch>
            </div>
          </div>
          <div v-if="isPublic" :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">公开设置</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <public-type-selector v-model="public_type" />
            </div>
          </div> -->

          <div :class="`${clsBlockName}-form-item no-line column-layout`">
            <yuque-editor ref="editorRef"></yuque-editor>
            <span class="word-count">字数 {{ editorRef?.wordCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "WritePage" });
const clsBlockName = "write-page";

const editorRef = ref();
const current = ref("self");
const isPublic = ref(false);
const public_type = ref("full");

const radioBarList = [
  {
    label: "自己",
    value: "self",
  },
  {
    label: "他人",
    value: "email",
  },
];
</script>
