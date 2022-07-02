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

<style lang="scss" scoped>
.app-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    .main-wrapper {
        position: fixed;
        top: var(--header-height);
        left: 320px;
        width: calc(100vw - 320px);
        height: 100vh;
        overflow-y: auto;
        .doc-wrapper{
            display: flex;
            flex-wrap: nowrap;
            padding: 32px 56px 56px 56px;
            flex: 1;
            background-color: var(--bg-color-page);
        }
    }
}
</style>