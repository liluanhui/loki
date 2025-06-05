<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-form`">
      <div :class="`${clsBlockName}-header`">
        <TheLogo />
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input name="uid" v-model="form.uid" size="large" :placeholder="t('login.uid_input')" clearable />
        </div>
      </div>
      <div :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-input
            name="password"
            v-model="form.password"
            size="large"
            type="password"
            :placeholder="t('login.password_input')"
            clearable />
          <div class="forgot-psw">
            <bp-link size="small">{{ t("login.forgot_password") }}</bp-link>
          </div>
        </div>
      </div>
      <div v-if="type === 'modal'" :class="`${clsBlockName}-form-item btn-item`">
        <bp-button type="plain" size="large" full>{{ t("common.register") }}</bp-button>
        <bp-button full size="large" :loading :disabled="!form.uid || !form.password" @click="handleLogin">{{
          t("common.login")
        }}</bp-button>
      </div>
      <div v-else :class="`${clsBlockName}-form-item`">
        <div :class="`${clsBlockName}-form-item-content`">
          <bp-button full :loading :disabled="!form.uid || !form.password" @click="handleLogin">{{ t("common.login") }}</bp-button>
        </div>
      </div>
      <div :class="`${clsBlockName}-other`">
        <label for="">{{ t("login.other_login") }}</label>
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
import { useI18n } from "vue-i18n";

defineOptions({ name: "LoginIndex" });
const clsBlockName = "login-index";

const props = defineProps({
  type: { type: String, default: "modal" },
});
const emits = defineEmits(["success"]);

const loading = ref(false);
const form = ref<LoginForm>(new LoginForm());

const { t } = useI18n();

const useStore = useUserStore();
const handleLogin = async () => {
  try {
    loading.value = true;
    await useStore.handleLogin(form.value);
    emits("success");
    return msg.success(t("login.login_success"));
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
