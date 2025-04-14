<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-wechat-title="$route.meta.title" />
  </router-view>
</template>
