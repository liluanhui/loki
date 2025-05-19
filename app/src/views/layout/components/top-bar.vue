<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <div :class="`${clsBlockName}-nav`">
        <TheLogo @click="toHome" />

        <ul :class="[`${clsBlockName}-menu`]">
          <router-link custom :to="v.to" v-for="(v, k) in list" v-slot="{ navigate, isExactActive }">
            <li :class="[`${clsBlockName}-menu-item`, { 'app-route-active': isExactActive }]" @click="navigate">
              <span :class="`${clsBlockName}-menu-item-inner`">{{ v.title }}</span>
            </li>
          </router-link>
        </ul>
      </div>

      <div :class="`${clsBlockName}-option`">
        <lang-trigger />
        <theme-trigger />

        <bp-button v-if="!isLogin()" size="small" status="primary" type="dashed" @click="handleLoginClick">{{ t("common.login") }}</bp-button>
        <bp-button v-else size="small" status="primary" type="dashed" @click="handleLogout">LOGOUT</bp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/useUser";
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

defineOptions({ name: "TopBar" });
const clsBlockName = "top-bar";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const { t } = useI18n();

const list: any[] = [
  { title: t("route.public"), to: "/public" },
  { title: t("route.write"), to: "/write" },
  { title: t("route.tool"), to: "/test" },
  { title: t("route.about"), to: "/test" },
];

const { isLogin, handleLogout } = useUserStore();
const accountCtx = ref(inject("account", undefined));

const handleLoginClick = () => {
  if (!isLogin()) {
    accountCtx.value.login();
    return;
  }
};
</script>
