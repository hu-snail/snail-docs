<template>
  <div class="font-sans antialiased">
      <HeaderCompontent />
      <div class="bg-white  dark:bg-slate-800">
        <div class="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 ">
          <SideBar/>
          <Main />
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
