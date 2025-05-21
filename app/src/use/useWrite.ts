import { DraftForm } from "@loki/odin/src/types/mail/draft";
import { Message } from "birdpaper-ui";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useWrite = () => {
  const { t } = useI18n();
  const form = ref<DraftForm>(new DraftForm());

  const draftLoading = ref(false);
  const sendLoading = ref(false);

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
    formField,
    typeList,
    saveDraft,
  };
};
