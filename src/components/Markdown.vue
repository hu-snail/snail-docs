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

<style lang="scss" scoped>
.md-wrapper {
  display: flex;
  justify-content: center;
  .md-container {
    color: var(--text-color);
    max-width: 740px;
    background-color: var(--bg-color);
    padding: 15px 20px;
    border-radius: 10px;
    .cover-img {
      width: 100%;
      border-radius: 8px;
      max-height: calc(680px / 1.78);
      object-fit: cover;
    }
  }
  .anchor-content {
     width: 240px;
    box-sizing: border-box;
    font-size: 13px;
    .sticky-box {
      width: 240px;
      border-radius: 10px;
      position: fixed;
      margin-left: 15px;
      top: 90px;
      bottom: 20px;
      background-color: var(--bg-color);
      overflow: hidden;
      .anchor-box {
        height: calc(100vh - 200px);
        overflow-y: auto;
      }
    }
    .top-title {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      color: var(--text-color)
    }
    .anchor-item {
      position: relative;
      padding: 5px 15px;
      box-sizing: border-box;
      &:hover {
         .anchor-item-title {
          color: var(--color-primary);
        }
      }
      &.active {
        .anchor-item-title {
          color: var(--color-primary);
        }
        // border-left: 3px solid var(--color-primary);
        &::before{
          content: "";
          position: absolute;
          top: 2px;
          left: 0;
          margin-top: 7px;
          width: 4px;
          height: 16px;
          background: var(--color-primary);
          border-radius: 0 4px 4px 0;
        }
      }
      &-title {
        color: var(--text-color)
      }
       &-2 {
        padding-left: 26px;
      }
      &-3 {
        padding-left: 52px;
      }
      &-4 {
        padding-left: 78px;
      }

    }
    
  }
}
</style>