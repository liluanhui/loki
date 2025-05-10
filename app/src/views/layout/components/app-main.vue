<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
  
  <!-- 全局登录弹窗 -->
  <login-modal ref="loginModalRef"></login-modal>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useRef } from "@loki/fpo-ui/use/useCompRef";
import loginModal from "@/views/account/login/login-modal.vue";

defineOptions({ name: "AppMain" });
const clsBlockName = "app-main";

// 全局登录弹窗
const loginModalRef = useRef(loginModal);
provide("account", {
  login: () => loginModalRef.value.open(),
});
</script>
