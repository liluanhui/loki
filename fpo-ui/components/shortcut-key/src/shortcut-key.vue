<template>
  <div :class="clsBlockName">
    <div class="shortcut-item" v-for="v in keys">
      {{ v }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ShortcutKey" });
const clsBlockName = "shortcut-key";

const props = defineProps({
  keys: {
    type: Array,
    default: () => ["⌘", "K"],
  },
});
</script>
