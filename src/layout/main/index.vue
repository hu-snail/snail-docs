<template>
    <div class="page-content">
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
.page-content {
   min-height: calc(100vh - var(--header-height));
   overflow-y: auto;
   flex: 1;
}
</style>