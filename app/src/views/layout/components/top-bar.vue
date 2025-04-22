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

        <bp-button-group size="small" status="warning" type="dashed">
          <bp-button>登录</bp-button>
          <bp-button>注册</bp-button>
        </bp-button-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
defineOptions({ name: "TopBar" });
const clsBlockName = "top-bar";

const router = useRouter();
const toHome = () => {
  router.push("/");
};

const list: any[] = [
  { title: "公开信", to: "/public" },
  { title: "写信", to: "/test" },
  { title: "工具箱", to: "/test" },
  { title: "关于", to: "/test" },
];
</script>
