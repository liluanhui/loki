<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-form`">
      <div :class="`${clsBlockName}-header`">账号密码登录</div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input size="large" placeholder="UID / 邮箱 / 手机号" clearable />
        </div>
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input size="large" type="password" placeholder="输入密码" clearable />
          <div class="forgot-psw">
            <bp-link size="small">忘记密码</bp-link>
          </div>
        </div>
      </div>
      <div :class="`${clsBlockName}-form-item btn-item`">
        <bp-button type="plain" size="large" full>注册</bp-button>
        <bp-button full size="large">登录</bp-button>
      </div>
      <div :class="`${clsBlockName}-form-item `">
        <label for="">其它登录：</label>
        <div class="thrid-login-list">
          <IconGithubFill size="22" />
        </div>
      </div>
    </div>
    <div :class="`${clsBlockName}-option`">
      <div class="bg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LoginIndex" });
const clsBlockName = "login-index";
</script>
