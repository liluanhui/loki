import { DraftForm } from "@loki/odin/src/types/mail/draft";
import { Message } from "birdpaper-ui";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useWrite = () => {
  const { t } = useI18n();
  const form = ref<DraftForm>(new DraftForm());

  /** 草稿按钮 */
  const draftLoading = ref(false);
  const draftText = computed(() => {
    return draftLoading.value ? t("write.editor.draft_text_loading") : t("write.editor.draft_text");
  });

  /** 发送按钮 */
  const sendLoading = ref(false);
  const sendText = computed(() => {
    return sendLoading.value ? t("write.editor.send_text_loading") : t("write.editor.send_text");
  });

  const btnDisabled = computed(() => {
    return !form.value.title;
  });

  // 寄信类型
  const typeList = [
    { label: t("write.editor.send_type.self"), value: "self" },
    { label: t("write.editor.send_type.other"), value: "email" },
  ];

  // 字段标签展示处理
  const createFormField = (key: string) => t(`write.editor.${key}`) + t("common.field_colon");
  const formField = {
    type: createFormField("send_field"),
    isPublic: createFormField("is_public"),
    title: createFormField("title"),
    delivery_time: createFormField("delivery_time"),
    recipient_email: createFormField("recipient_email"),
    recipient_name: createFormField("recipient_name"),
    public_type: createFormField("public_type"),
  };

  // 保存草稿
  const saveDraft = async () => {
    try {
      // draftLoading.value = true;
      Message.success("保存成功");
    } catch (err) {
      Message.error((err as Error).message);
    }
  };

  return {
    form,
    draftLoading,
    sendLoading,
    draftText,
    sendText,
    btnDisabled,
    formField,
    typeList,
    saveDraft,
  };
};
