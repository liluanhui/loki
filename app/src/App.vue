<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-wechat-title="$route.meta.title" />
  </router-view>
</template>

<style lang="scss">
#nprogress .bar {
  height: 1px !important;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
