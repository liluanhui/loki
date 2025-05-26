<template>
  <div :class="clsBlockName" :style="{ width }">
    <transition name="slide-up-down" mode="out-in">
      <component :is="componentObj[props.type]" v-bind="_props" @back="goBack" @on-event="onEvent" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import menus from "./components/menus.vue";
import write from "./components/write.vue";
import confirm from "./components/confirm.vue";
import { useUserStore } from "@/stores/useUser";

const props = defineProps({
  type: {
    type: String,
    default: "menus",
  },
});

defineOptions({ name: "MobileBar" });
const clsBlockName = "mobile-bar";
const { isLogin } = useUserStore();

const width = ref("80%");
const componentObj = computed(() => {
  return { menus, write: isLogin() ? write : menus, confirm };
});
const _events = ref(null);
const _props = ref({});

watch(
  () => props.type,
  (val) => {
    const obj = {
      menus: "80%",
      write: "80%",
      confirm: "max-content",
    };

    setTimeout(() => {
      width.value = obj[val] || "80%";
    }, 200);
  }
);

const onEvent = (name: string) => {
  if (_events.value && typeof _events.value[name] === "function") {
    _events.value[name]();
  }
};

const router = useRouter();
const goBack = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push("/");
  }
  window.scrollTo({ top: 0 });
};

defineExpose({
  _events,
  _props,
});
</script>

<style lang="scss" scoped>
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: all 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.slide-up-down-enter-from {
  transform: translateY(20%);
  opacity: 0;
}

.slide-up-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-to {
  transform: translateY(20%);
  opacity: 0;
}
</style>
