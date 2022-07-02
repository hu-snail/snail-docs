<template>
  <div class="preview-wrap">
    <div class="preview-head">
        <h2 class="preview-head_title">
            {{  component.__sourceCodeTitle }}
        </h2>
      
      <button @click="hideCode" v-if="codeVisible">隐藏代码</button>
      <button @click="showCode" v-else>查看代码</button>
    </div>
    <div class="preview-container-component">
      <component :is="component" />
    </div>

    <div class="preview-container-code" v-if="codeVisible">
      <pre class="language-html" v-html="html" />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Prism from  "prismjs";
import "prismjs/themes/prism.css";
const props = defineProps({
  component: Object,
});
const html = computed(() => {
  return Prism.highlight(
    props.component.__sourceCode,
    Prism.languages.html,
    "html"
  );
});
const showCode = () => (codeVisible.value = true);
const hideCode = () => (codeVisible.value = false);
const codeVisible = ref(false);
</script>
<style lang="scss" scoped>
.preview-wrap{
  border: 1px solid #d9d9d9;
  margin: 32px 0px 32px;
  min-width: 300px;
  .preview-head{
    padding: 8px 16px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_title{
        font-size: 20px;
    }
  }
}
.preview-container-component {
    padding: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
.preview-container-actions {
    padding: 8px 16px;
    border-top: 1px dashed #d9d9d9;
  }
.preview-container-code {
    padding: 8px 16px;
    border-top: 1px dashed #d9d9d9;
}
.preview-container-code > pre {
    line-height: 1.1;
    font-family: Consolas, "Courier New", Courier, monospace;
    margin: 0;
    background-color: rgb(250, 250, 250);
}
</style>