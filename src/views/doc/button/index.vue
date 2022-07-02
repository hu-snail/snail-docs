<template>
  <div class="button-doc-wrapper">
    <h1>Button 按钮</h1>
    <p>常用的操作按钮。</p>
    <div class="preview-wrapper">
        <Preview :component="ButtonPreview1" />
    </div>
</div>
</template>
<script setup>
import Preview from "@/components/Preview.vue";
import ButtonPreview1 from "./button.preview.vue";

</script>