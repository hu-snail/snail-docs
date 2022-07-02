<template>
    <aside class="aside-bar">
      <div class="aside-bar-card">
        <div class="card-item">
          <div class="logo">
            <h3>LOGO</h3>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content">
           <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-quanbu"></use>
            </svg>
            <span class="card-item-title">首页</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content active">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-zujianxinxi"></use>
            </svg>
            <span class="card-item-title">组件</span>
          </div>
        </div>
         <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-Vue"></use>
            </svg>
            <span class="card-item-title">Vue物料</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-js"></use>
            </svg>
            <span class="card-item-title">Javascript</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-react"></use>
            </svg>
            <span class="card-item-title">React物料</span>
          </div>
        </div>
         <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-CSS"></use>
            </svg>
            <span class="card-item-title">CSS</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-html"></use>
            </svg>
            <span class="card-item-title">HTML</span>
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-content">
             <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-Nodejs"></use>
            </svg>
            <span class="card-item-title">NodeJS</span>
          </div>
        </div>
      </div>
      <div class="aside-bar-card-content">
        <div class="head-wrapper">
          <div class="search-box">
            <icon-search class="icon" color="#666"></icon-search>
            <input placeholder="搜索" type="text" class="search-input">
          </div>
        </div>
        <div class="menu-list">
          <div class="menu-group" v-for="(itemx, index) in docMenus" :key="index">
             <span class="menu-group-title text-overflow">
              {{ index }}
            </span>
            <router-link
              v-for="(itemy, indey) in itemx"
              :key="indey"
              class="menu-item text-overflow"
              :to="`/doc/${itemy.path}`"
              >{{ itemy.name }}</router-link
            >
          </div>
        </div>
      </div>
    </aside>
</template>

<script setup>
import { docMenus } from "@/routes/doc-routes.js";
</script>

<style lang="scss" scoped>
.aside-bar {
  display: flex;
  position: fixed;
  height: 100%;
  transition: all 250ms ease;
  overflow-y: auto;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  &-card {
    width: 100px;
    height: 100%;
    background-color: var(--bg-color-page);
    .card-item {
      height: 64px;
      .logo{
        display: flex;
        justify-content: center;
        color: var(--text-color);
      }
      &-content{
        width: 84px;
        height: 54px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
        color: var(--text-color);
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        &.active {
          color: var(--color-white);
          background-color: var(--color-primary);
          &:hover{
            color: var(--color-white);
          }
        }
        &:hover {
          color: var(--color-primary);
        }
      } 
    }
    &-content {
      background-color: var(--color-header-bg);
      width: 220px;
      transition: all .3s cubic-bezier(.645,.045,.355,1),border 0s,color .1s,font-size 0s;
      .head-wrapper {
        border-bottom: 1px dashed var(--border-color);
        height: 60px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        .search-box {
          position: relative;
          .icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .search-input {
            background-color: var(--bg-color-page);
            border: 0;
            outline-style: none;
            width: 190px;
            height: var(--input-height);
            padding: 0;
            padding: 10px 20px;
            box-sizing: border-box;
            font-family: "Microsoft soft";
            border-radius: var(--border-radius-round);
            &:focus, &:hover {
                background-color: var(--bg-color-page);
                outline: 0;
                -webkit-box-shadow: var(--docsearch-searchbox-shadow);
                box-shadow: var(--docsearch-searchbox-shadow)
            }
          }
        }
        .title {
          font-size: 16px;
          font-weight: 450;
          margin: 0;
          color: var(--text-color)
        }
      }
      .menu-list {
        padding: 10px;
        .menu-group {
        width: 100%;
      }
      .menu-group-title,
      .menu-item {
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        position: relative;
       
      }
      .menu-group-title {
        height: 36px;
        padding-left: 32px;
        font-size: 13px;
        color: var(--text-color);
        overflow: hidden;
        box-sizing: border-box;
        &:hover {
          cursor: default;
        }
      }
      .menu-item {
        height: 44px;
        padding-left: 48px;
        color: var(--text-color);
        font-size: 14px;
        margin: 5px 0;
        &:hover {
          color: var(--color-primary);
        }
      }
      .router-link-exact-active {
         color: var(--color-primary);
        background-color: var(--bg-color-page);
        border-radius: 3px;
      }
      }
    }
  }
}
</style>