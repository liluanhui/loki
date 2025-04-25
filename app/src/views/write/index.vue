<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-banner`"></div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-editor`">
        <div :class="`${clsBlockName}-form`">
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">寄给</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <!-- <bp-radio-group v-model="current" type="button">
                <bp-radio v-for="v in radioBarList" :value="v.value">{{ v.label }}</bp-radio>
              </bp-radio-group> -->
              <radio-bar v-model="current" size="small" :option-list="radioBarList"></radio-bar>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">收件人</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="输入邮件地址" :style="{ width: '260px' }" clearable> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">收件人称呼</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="输入对方的称呼" :style="{ width: '260px' }" clearable> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">主题</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="信件主题" :style="{ width: '480px' }" clearable :maxlength="25" show-limit> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">是否公开</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-switch></bp-switch>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">公开设置</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <div class="public-type-option">
                <div class="public-type-option-item" v-for="v in publicTypeList" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="`${clsBlockName}-option`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "WritePage" });
const clsBlockName = "write-page";

const current = ref("email");
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

const publicTypeList = [
  {
    name: "完全公开",
    type: "full",
    recipient_type: "self",
    sender_avatar: "寄件人",
    sender_name: "寄件人",
    recipient_email: "11111111111@qq.com",
    recipient_name: "收件人",
  },
  {
    name: "隐私保护",
    type: "privary",
  },
  {
    name: "匿名",
    type: "anonymity",
  },
];
</script>
