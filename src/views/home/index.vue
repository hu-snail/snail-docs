<template>
  <div class="min-h-full h-screen  dark:bg-slate-800">
   <HeaderCompontent />
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <h1
                  class="
                    mt-2
                    text-6xl
                    leading-2
                    font-extrabold
                    tracking-tight
                    uppercase
                    bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500
                  "
                >
                  Snail Docs
                </h1>
                <p
                  class="
                    mt-2
                    text-3xl
                    leading-8
                    font-extrabold
                    tracking-tight
                    py-4
                    text-gray-900
                    dark:text-gray-200
                    sm:text-4xl
                  "
                >
                 Quickly generate your documents
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                  基于Vue3 + Vite2 + Element-plus + Pinia +
                  Vue-Router4等最新技术构建
                </p>
              </div>
              <div class="mt-5 sm:mt-8 sm:flex justify-center">
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="
                      w-full
                      flex
                      items-center
                      justify-center
                      px-8
                      py-3
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      text-white
                      bg-gradient-to-r from-indigo-500 to-pink-500
                      hover:bg-indigo-700
                      md:py-4 md:text-lg md:px-10
                    "
                  >
                    立即开始
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    class="
                      w-full
                      flex
                      items-center
                      justify-center
                      px-8
                      py-3
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      text-indigo-700
                      bg-indigo-100
                      hover:bg-indigo-200
                      md:py-4 md:text-lg md:px-10
                    "
                  >
                    在线预览
                  </a>
                </div>
              </div>

              <div class="mt-10">
                <dl
                  class="
                    space-y-10
                    md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10
                  "
                >
                  <div
                    v-for="feature in features"
                    :key="feature.name"
                    class="relative"
                  >
                    <dt>
                      <div
                        class="
                          absolute
                          flex
                          items-center
                          justify-center
                          h-12
                          w-12
                          rounded-md
                          bg-indigo-500
                          text-white
                        "
                      >
                        <component
                          :is="feature.icon"
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        class="
                          ml-16
                          text-lg
                          leading-6
                          font-medium
                          dark:text-gray-300
                          text-gray-900
                        "
                      >
                        {{ feature.name }}
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                      {{ feature.description }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderCompontent from "@/layout/navbar/index.vue";
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon
} from "@heroicons/vue/outline";
const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon
  }
];
</script>
