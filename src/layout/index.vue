<template>
  <div class="font-sans antialiased">
    <div class="main-wrapper">
      <HeaderCompontent />
      <div class="bg-white h-screen max-h-screen overflow-y-auto">
        <div class="max-w-7xl mx-auto flex max-w-8xl px-4 sm:px-6 lg:px-8">
          <div class="hidden w-64 shrink-0 lg:block lg:pr-8">
            <div class="sticky top-[0px]">
              <div class="mb-6">
                <div class="relative">
                    <SideBar/>
                </div>
              </div>
            </div>
          </div>
          <Main />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderCompontent from "./navbar/index.vue";
import SideBar from "./sidebar/index.vue";
import Main from "./main/index.vue";
</script>
