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

    <div class="prose prose-neutral" v-if="codeVisible">
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
