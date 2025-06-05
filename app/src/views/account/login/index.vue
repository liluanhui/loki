<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-form`">
      <div :class="`${clsBlockName}-header`">
        <TheLogo />
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input name="uid" v-model="form.uid" size="large" placeholder="UID / 邮箱 / 手机号" clearable />
        </div>
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input name="password" v-model="form.password" size="large" type="password" placeholder="输入密码" clearable />
          <div class="forgot-psw">
            <bp-link size="small">忘记密码</bp-link>
          </div>
        </div>
      </div>
      <div v-if="type === 'modal'" :class="`${clsBlockName}-form-item btn-item`">
        <bp-button type="plain" size="large" full>注册</bp-button>
        <bp-button full size="large" :loading :disabled="!form.uid || !form.password" @click="handleLogin">登录</bp-button>
      </div>
      <div v-else :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-button full :loading :disabled="!form.uid || !form.password" @click="handleLogin">登录</bp-button>
        </div>
      </div>
      <div :class="`${clsBlockName}-other`">
        <label for="">其它登录</label>
        <div class="thrid-login-list">
          <IconGithubFill size="34" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LoginForm } from "@loki/odin/src/types/auth";
import { useUserStore } from "@/stores/useUser";
import { msg } from "@loki/fpo-ui";

defineOptions({ name: "LoginIndex" });
const clsBlockName = "login-index";

const props = defineProps({
  type: { type: String, default: "modal" },
});
const emits = defineEmits(["success"]);

const loading = ref(false);
const form = ref<LoginForm>(new LoginForm());

const useStore = useUserStore();
const handleLogin = async () => {
  try {
    loading.value = true;
    await useStore.handleLogin(form.value);
    emits("success");
    return msg.success("登录成功");
  } catch (err) {
    setTimeout(() => {
      msg.error((err as Error).message);
    }, 400);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};
</script>
