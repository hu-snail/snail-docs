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

