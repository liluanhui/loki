<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-banner`"></div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-editor`">
        <div :class="`${clsBlockName}-form`">
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">类型</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <!-- <bp-radio-group v-model="current" type="button">
                <bp-radio v-for="v in radioBarList" :value="v.value">{{ v.label }}</bp-radio>
              </bp-radio-group> -->
              <radio-bar v-model="current" :option-list="radioBarList"></radio-bar>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">收件人</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="输入邮件地址" :style="{ width: '280px' }"> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">主题</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="信件主题" :style="{ width: '100%' }"> </bp-input>
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
    label: "给自己",
    value: "self",
  },
  {
    label: "给他人",
    value: "email",
  },
];
</script>
