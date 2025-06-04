import { useStorage } from "@vueuse/core";
import { Message } from "birdpaper-ui";
import { showToast } from 'vant';
import "vant/lib/toast/style/index";

const appMode = useStorage("app-mode", "pc");
const isToast = appMode.value === "mobile";

export const msg = {
    success: () => {
        isToast ? showToast('open message') : Message.success('open message');
    }
}