import { addDraft, draftDetail, editDraft } from "@loki/odin-api";
import { DraftForm } from "@loki/odin/src/types/mail/draft";
import { Message } from "birdpaper-ui";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useWrite = () => {
  const { t } = useI18n();
  const form = ref<DraftForm>(new DraftForm());

  const loading = ref(false);

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
    return !form.value.title || !form.value.word_count;
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
      draftLoading.value = true;

      const api = form.value.id ? editDraft : addDraft;
      const res = await api(form.value);
      if (res.code != 0) {
        throw new Error(res.msg);
      }

      if (!form.value.id) {
        form.value.id = res.data;
      }

      Message.success("保存成功");
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      draftLoading.value = false;
    }
  };

  // 加载草稿
  const loadDraft = async (id: string) => {
    try {
      loading.value = true;
      const res = await draftDetail(id);
      if (res.code != 0) {
        throw new Error(res.msg);
      }
      form.value = res.data;
    } catch (err) {
      Message.error((err as Error).message);
    } finally {
      loading.value = false;
    }
  };

  return {
    form,
    loading,
    draftLoading,
    sendLoading,
    draftText,
    sendText,
    btnDisabled,
    formField,
    typeList,
    saveDraft,
    loadDraft,
  };
};
