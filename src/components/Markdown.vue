<template>
  <div class="md-wrapper" ref="wrapper">
    <div class="md-container" @scroll="handleScroll">
      <div class="md-head" ref="mdHead">
        <h1 class="md-title">{{attributes.title}}</h1>
        <img ref="img" v-if="attributes && attributes.coverImg" :src="attributes.coverImg" :alt="attributes.title" class="cover-img"/>
      </div>
      <article class="md-body" v-html="content"></article>
    </div>
    <div class="anchor-content">
      <div class="sticky-box">
        <h4 class="top-title">目录</h4>
        <div class="anchor-box">
          <div
          class="anchor-item"
          v-for="(item, index) in toc"
          :key="index"
          :class="getClassName(item, index)"
          >
          <a class="anchor-item-title" :href="`#${decode(item.content)}`">
            <span v-html="decode(item.content)"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, nextTick} from 'vue'
import { decode } from 'html-entities';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  attributes: {
    type: Object
  },
  toc: {
    type: Object
  }
});

const activeTitle = ref(null)
const wrapper = ref(null)
const img = ref(null)
const tocList = ref([])

const getClassName = (item, index) => {
  if (tocList.value.indexOf(item.level) === -1) tocList.value.push(item.level)
  const i = tocList.value.findIndex(option => item.level === option)
  return `anchor-item-${i + 1} ${activeTitle.value === '#heading-' + (index + 1) ? 'active' : ''}`
}

onMounted(() => {
   nextTick(() => {
     if (!wrapper.value) return
      wrapper.value.offsetParent.onscroll = function(e) {
        let scrollItems = document.querySelectorAll(".md-title");
        for (let i = scrollItems.length - 1; i >= 0; i--) {
            // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
           const next = scrollItems[i + 1] ? scrollItems[i + 1].offsetTop : scrollItems[i].offsetTop
            let judge = e.target.scrollTop >= next
            if (judge) {
                activeTitle.value = `#heading-${i + 1}`
                break;
            }
        }
      }
  })
})

</script>
