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

        <bp-button size="small" status="primary" type="dashed">{{ t("common.login") }}</bp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  { title: t('route.public'), to: "/public" },
  { title: t('route.write'), to: "/write" },
  { title: t('route.tool'), to: "/test" },
  { title: t('route.about'), to: "/test" },
];
</script>
