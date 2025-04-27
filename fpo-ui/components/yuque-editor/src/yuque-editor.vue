<template>
  <div :class="clsBlockName">
    <div :id="editorId" @keydown="handleKeydown" tabindex="0" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import toolbar from "./toolbar";
import simpleToolbar from "./simple-toolbar";

defineOptions({ name: "YuqueEditor" });
const clsBlockName = "yuque-editor";

const props = defineProps({
  showTitleEditor: { type: Boolean, default: false },
  editorId: { type: String, default: "yq-editor" },
  editorType: { type: String, default: "editor" },
  enableToc: { type: Boolean, default: true },
  placeholder: { type: String, default: "请输入文字" },
  paragraphTip: { type: String, default: "输入 / 唤起更多" },
  layout: { type: String, default: "fixed" },
  isSimple: { type: Boolean, default: false },
  disableQuickInput: { type: Boolean, default: false },
  imagePath: { type: String, default: "/article/pics" },
});

const emits = defineEmits<{
  (e: "change", content: string): void;
  (e: "save"): void;
  (e: "publish"): void;
  (e: "reset"): void;
}>();

const editor = ref();
const viewer = ref();
const wordCount = ref(0);

const initEditor = () => {
  const { createOpenEditor } = window["Doc"];
  if (!createOpenEditor) return;

  wordCount.value = 0;
  const el = document.getElementById(props.editorId);
  el.classList.add("ne-doc-major-editor");

  editor.value = createOpenEditor(el, {
    layout: props.layout,
    input: {
      autoSpacing: true,
    },
    slash: {
      disableQuickInput: props.disableQuickInput,
    },
    toolbar: props.isSimple ? simpleToolbar : toolbar,
    placeholder: {
      tip: props.placeholder,
      emptyParagraphTip: props.paragraphTip,
    },
    uiSwitch: {
      default: "small",
    },
    // image: {
    //   isCaptureImageURL() {
    //     return true;
    //   },
    //   createUploadPromise: async (request: { type: "file" | "url"; data: File }) => {
    //     const { type, data } = request;

    //     if (type === "url") {
    //       // TODO: URL情况，暂不处理
    //     }

    //     // var key = generateFileKey(props.imagePath, data.name);

    //     return new Promise((resolve, reject) => {
    //       // uploadFile(
    //       //   data,
    //       //   key,
    //       //   (params: ProgressInfo) => {},
    //       //   (err: Error, data: UploadFileItemResult, options: UploadFileItemParams) => {},
    //       //   (err: CosSdkError, data: any) => {
    //       //     resolve({
    //       //       url: `${domain.cdn}/${key}`,
    //       //       size: data.size,
    //       //       filename: data.name,
    //       //     });
    //       //   }
    //       // );
    //     });
    //   },
    // },
    envAdapter: {
      openLink: (url: string, isExternal: boolean) => {
        console.info(url, isExternal);
      },
    },
  });

  setContent();

  editor.value.execCommand("focus");

  editor.value.on("contentchange", () => {
    wordCount.value = editor.value.queryCommandValue("wordCount");
    emits("change", getContent());
  });
};

const setContent = (title: string = "", content: string = "", type: string = "text/lake") => {
  return editor.value.setDocument(type, content);
};

const setViewerContent = (content: string = "", type: string = "text/lake") => {
  return viewer.value.setDocument(type, content);
};

const getContent = (type: string = "text/lake") => {
  return editor.value.getDocument(type);
};

const handleKeydown = (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "s") {
    event.preventDefault();
    emits("save");
  }
};

onMounted(() => {
  nextTick(() => {
    if (props.editorType === "editor") {
      initEditor();
      return;
    }
    // initViewer();
  });
});

defineExpose({
  initEditor,
  // initViewer,
  setViewerContent,
  setContent,
  getContent,
  wordCount,
});
</script>

<style>
@import "./lib/antd.css";
@import "./lib/doc.css";
</style>
