---
title: Awesome Title
description: Describe this awesome content
path: intro
name: 介绍
tags:
  - "great"
  - "awesome"
  - "rad"
---

# 开始
本文会帮助你从头启动项目

## 前言

::: tip 说明
项目基础配置参考的[vue-admin-beautiful-template](https://github.com/chuzhixin/vue-admin-beautiful-template),感谢大佬的开源！
项目虽然二次封装了一些组件，但是可能不能满足大部分的要求。所以，如果组件不满足你的要求，完全可以不用甚至删除代码自己写，不必坚持使用项目自带的组件。

:::

## 环境准备

本地环境需要安装 [Yarn1.x](https://yarnpkg.com/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

::: warning 注意

- 必须使用[Yarn1.x](https://yarnpkg.com/)，否则依赖可能安装不上。

- [Node.js](http://nodejs.org/) 版本要求`12.x`以上，且不能为`13.x`版本，这里推荐 `14.x` 及以上。
:::

## 工具配置

如果您使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify 图标插件
- [windicss IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - windicss 提示插件
- [I18n-ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n 插件
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备 （也可以选择 Volar）
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env 文件 高亮

## 代码获取

::: warning 注意
注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。
:::

### 从 GitHub 获取代码

```bash
# clone 代码
git clone https://github.com/anncwb/vue-vben-admin

```

### 从 Gitee 获取代码

如果从 github clone 代码较慢的话，可以尝试用 [Gitee](https://gitee.com/annsion/vue-vben-admin) 同步代码到自己的仓库，再 clone 下来即可。

也可以通过下方地址进行 clone

```bash
git clone https://gitee.com/annsion/vue-vben-admin
```

::: warning 注意
[Gitee](https://gitee.com/annsion/vue-vben-admin)的代码可能不是最新的
:::

## 安装

### 安装 Node.js

如果您电脑未安装[Node.js](https://nodejs.org/en/)，请安装它。

**验证**

```bash
# 出现相应npm版本即可
npm -v
# 出现相应node版本即可
node -v

```

如果你需要同时存在多个 node 版本，可以使用 [Nvm](https://github.com/nvm-sh/nvm) 或者其他工具进行 Node.js 进行版本管理。

### 安装依赖

#### yarn 安装

必须使用 [Yarn](https://github.com/yarnpkg/yarn)进行依赖安装（若其他包管理器安装不了需要自行处理）。

如果未安装`yarn`，可以用下面命令来进行全局安装

```bash
# 全局安装yarn
npm i -g yarn
# 验证
yarn -v # 出现对应版本号即代表安装成功
```

#### 依赖安装命令

在项目根目录下，打开命令窗口执行，耐心等待安装完成即可

```bash
# 安装依赖
yarn
```
