<template>
    <div class="app-container">
        <SideBar/>
        <div class="main-wrapper">
            <HeaderCompontent />
            <div class="doc-wrapper">
                <Main />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderCompontent from './navbar/index.vue'
import SideBar from './sidebar/index.vue'
import Main from './main/index.vue'

</script>

