<template>
  <div :class="clsBlockName">123</div>
</template>

<script setup lang="ts">
defineOptions({ name: "LetterDetail" });
const clsBlockName = "letter-detail";

const open = ()=>{

}

defineExpose({
  open,
});
</script>
