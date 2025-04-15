<template>
  <div :class="clsBlockName">
    <div :class="`${clsBlockName}-inner`">
      <div :class="`${clsBlockName}-logo`">
        <TheLogo />
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
</script>
