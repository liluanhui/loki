<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <div :class="`${clsBlockName}-nav`">
        <TheLogo />

        <ul :class="[`${clsBlockName}-menu`]">
          <router-link custom :to="v.to" v-for="(v, k) in list" v-slot="{ navigate, isExactActive }">
            <li :class="[`${clsBlockName}-menu-item`, { 'app-route-active': isExactActive }]" @click="navigate">
              <span :class="`${clsBlockName}-menu-item-inner`">{{ v.title }}</span>
            </li>
          </router-link>
        </ul>
      </div>

      <div :class="`${clsBlockName}-option`">
        <bp-button-group size="small" status="warning" type="dashed">
          <bp-button>登录</bp-button>
          <bp-button>注册</bp-button>
        </bp-button-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TheLogo } from "@loki/fpo-ui";

defineOptions({ name: "TopBar" });
const clsBlockName = "top-bar";

const list: any[] = [
  { title: "公开信", to: "/a" },
  { title: "写一封信", to: "/a" },
  { title: "工具箱", to: "/a" },
];
</script>
