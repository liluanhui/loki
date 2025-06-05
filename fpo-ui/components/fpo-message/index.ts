import { useStorage } from "@vueuse/core";
import { Message } from "birdpaper-ui";
import { showToast } from "vant";
import "vant/lib/toast/style/index";
import { computed } from "vue";

const appMode = useStorage("app-mode", "pc");
const isToast = computed(() => appMode.value === "mobile");

export const msg = {
  success: (content: string) => {
    isToast.value
      ? showToast({
          message: content,
          wordBreak: "break-word",
        })
      : Message.success(content);
  },
  error: (content: string) => {
    isToast.value
      ? showToast({
          message: content,
          wordBreak: "break-word",
        })
      : Message.error(content);
  },
};
