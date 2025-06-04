<template>
  <popup v-model:show="popupShow" position="bottom" :style="{ height: '82%' }" :duration="0.2" round safe-area-inset-bottom @close="close">
    <div :class="clsBlockName">
      <div :class="`${clsBlockName}-header`">
        <TheLogo />
      </div>

      <div :class="`${clsBlockName}-form`">
        <div :class="`${clsBlockName}-form-item`">
          <div :class="`${clsBlockName}-form-item-content`">
            <bp-input v-model="form.uid" placeholder="UID / 邮箱 / 手机号" clearable />
          </div>
        </div>
        <div :class="`${clsBlockName}-form-item`">
          <div :class="`${clsBlockName}-form-item-content`">
            <bp-input v-model="form.password" type="password" placeholder="输入密码" clearable />
            <div class="forgot-psw">
              <bp-link size="small">忘记密码</bp-link>
            </div>
          </div>
        </div>
        <div :class="`${clsBlockName}-form-item`">
          <div :class="`${clsBlockName}-form-item-content`">
            <bp-button full>登录</bp-button>
          </div>
        </div>
        <!-- <div :class="`${clsBlockName}-form-item `">
          <label for="">其它登录：</label>
          <div class="thrid-login-list">
            <IconGithubFill size="22" />
          </div>
        </div> -->
      </div>
    </div>
  </popup>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { Popup } from "vant";
import "vant/lib/popup/style/index";
import { LoginForm } from "@loki/odin/src/types/auth";
import { useUserStore } from "@/stores/useUser";
import { Message } from "birdpaper-ui";

const props = defineProps({
  title: { type: String, default: "登录邮局，给未来寄封信" },
});
const clsBlockName = "login-popup";
const popupShow = ref<boolean>(false);

const loading = ref(false);
const form = ref<LoginForm>(new LoginForm());

const useStore = useUserStore();
const handleLogin = async () => {
  try {
    loading.value = true;
    await useStore.handleLogin(form.value);
    // emits("success");
    return Message.success("登录成功");
  } catch (err) {
    setTimeout(() => {
      Message.error((err as Error).message);
    }, 400);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};

const mobileBarCtx: any = inject("mobile-bar");
const open = () => {
  popupShow.value = true;
  popupShow.value = true;
  mobileBarCtx?.change("loginOption", {
    events: {
      close,
    },
  });
};

const close = () => {
  popupShow.value = false;
  mobileBarCtx?.reset();
};

defineExpose({
  open,
  close,
});
</script>
