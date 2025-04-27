<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-banner`"></div>

    <div :class="`${clsBlockName}-container`">
      <div :class="`${clsBlockName}-option`"></div>

      <div :class="`${clsBlockName}-editor`">
        <div :class="`${clsBlockName}-form`">
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">寄给</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <radio-bar v-model="current" size="small" :option-list="radioBarList"></radio-bar>
            </div>
          </div>
          <div v-if="current === 'email'" :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">收件人</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="输入邮件地址" :style="{ width: '260px' }" clearable> </bp-input>
            </div>
          </div>
          <div v-if="current === 'email'" :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">收件人称呼</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="输入对方的称呼" :style="{ width: '260px' }" clearable> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">主题</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-input placeholder="信件主题" :style="{ width: '560px' }" clearable :maxlength="25" show-limit> </bp-input>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
            <label :class="`${clsBlockName}-form-item-label`">投递时间</label>
            <div :class="`${clsBlockName}-form-item-content`">
              <bp-date-picker
                placeholder="选择投递时间"
                :style="{ width: '260px' }"
                show-time
                value-format="YYYY-MM-DD HH:mm:ss"></bp-date-picker>
            </div>
          </div>
          <div :class="`${clsBlockName}-form-item`">
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
          </div>
          <yuque-editor></yuque-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import yuqueEditor from "./components/yuque-editor.vue";

defineOptions({ name: "WritePage" });
const clsBlockName = "write-page";

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
