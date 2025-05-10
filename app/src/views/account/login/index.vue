<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-form`">
      <!-- <div :class="`${clsBlockName}-header`">
        账号密码登录
      </div> -->
      <div :class="`${clsBlockName}-form-item`">
        <bp-input size="large" placeholder="UID / 邮箱 / 手机号" clearable></bp-input>
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <bp-input size="large" type="password" placeholder="输入密码" clearable></bp-input>
      </div>
      <div :class="`${clsBlockName}-form-item btn-item`">
        <bp-button type="plain" size="large" full>注册</bp-button>
        <bp-button full size="large">登录</bp-button>
      </div>
    </div>
    <div :class="`${clsBlockName}-option`">123</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LoginIndex" });
const clsBlockName = "login-index";
</script>
