<template>
  <div class="flex min-w-0 flex-1 mt-10" ref="wrapper">
    <div
      class="order-1 lg:mx-8 xl:mx-10 md:mx-8 sm:mx-0 min-w-0 mb-10 max-w-[800px] flex-1"
      @scroll="handleScroll"
    >
      <div class="md-head" ref="mdHead">
        <div v-if="attributes && attributes.coverImg" class="xl:h-80 md:h-80 lg:h-80 sm:h-32">
          <img
            ref="img"
            :src="attributes.coverImg"
            :alt="attributes.title"
            class="object-cover rounded-md h-full w-full mb-5"
          />
        </div>
      </div>
      <article
        class="
          prose prose-neutral
          mt-5
          hover:prose-a:text-indigo-400
          dark:prose-invert
          prose-img:rounded-xl
          max-w-none
        "
        v-html="content"
      ></article>
    </div>
    <div class="z-10 order-2 hidden w-64 min-w-0 shrink-0 xl:block xl:pl-8">
      <div class="sticky top-[112px] max-h-screen overflow-y-auto">
        <div class="anchor-box font-sans text-sm">
          <template v-for="(item, index) in toc" :key="index">
            <div v-if="item.level <= 2" class="anchor-item py-1" :class="getClassName(item, index)">
              <a class="anchor-item-title dark:text-gray-300" :href="`#${decode(item.content)}`">
                <span v-html="decode(item.content)"></span>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { decode } from "html-entities";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  attributes: {
    type: Object,
  },
  toc: {
    type: Object,
  },
});

const activeTitle = ref(null);
const wrapper = ref(null);
const img = ref(null);
const tocList = ref([]);

const getClassName = (item, index) => {
  if (tocList.value.indexOf(item.level) === -1) tocList.value.push(item.level);
  const i = tocList.value.findIndex((option) => item.level === option);
  return `anchor-item-${i + 1} ${
    activeTitle.value === "#heading-" + (index + 1) ? "active" : ""
  }`;
};

onMounted(() => {
  nextTick(() => {
    if (!wrapper.value) return;
    wrapper.value.offsetParent.onscroll = function (e) {
      let scrollItems = document.querySelectorAll(".md-title");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // ?????????????????????????????????????????????????????????????????????
        const next = scrollItems[i + 1]
          ? scrollItems[i + 1].offsetTop
          : scrollItems[i].offsetTop;
        let judge = e.target.scrollTop >= next;
        if (judge) {
          activeTitle.value = `#heading-${i + 1}`;
          break;
        }
      }
    };
  });
});
</script>
