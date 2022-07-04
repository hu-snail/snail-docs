<template>
  <div class="font-sans antialiased ">
      <HeaderCompontent />
      <div class="md:flex md:justify-center">
      <div class="bg-white dark:bg-slate-800 max-w-8xl  mx-auto ">
        <div class="flex px-4 sm:px-6 md:px-8 ">
          <SideBar/>
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
