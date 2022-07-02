<template>
    <header class="navbar">
        <div class="navbar-wrapper">
            <div class="header-wrapper">
                <div class="left-panel"></div>
                <div class="right-panel">
                    <div class="item">指南</div>
                    <div class="item">Javascript</div>
                    <div class="item">Vue</div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.navbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 320px;
    z-index: var(--nav-z-index);
    background-color: var(--color-header-bg);
    &-wrapper {
        color: var(--text-color);
        transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration-fast);
        position: relative;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        padding: 0 35px 0 35px;
        height: var(--header-height);
        top: 0;
        .header-wrapper {
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            .right-panel {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                flex-grow: 1;
                
                .item {
                    padding: 0 15px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>