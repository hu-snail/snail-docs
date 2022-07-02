---
title: 使用NodeJs构建属于自己的前端脚手工具
description: Describe this awesome content
coverImg: https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170
path: get-started
name: 快速开始
tags:
  - "great"
  - "awesome"
  - "rad"
---

## 一.前言

在日常开发中，我们经常会用到各种脚手架工具，如常用的`vue`和`react`脚手架工具：`vue-cli`、`Create React App`。只需要执行内置命令和选择内置条件就可以生成对应的项目模板。极大的提高了我们开发开发效率，所以我们能不能根据自己的日常业务构建属于自己的一套脚手架工具呢，答案是可以的。接下来步入本文章的主题

## 二.技术栈
- [commander](https://github.com/tj/commander.js)：`^9.2.0` ：完整的 [node.js](http://nodejs.org/)命令行解决方案
- [execa](https://github.com/sindresorhus/execa)： `^6.1.0`:执行shel命令
- [inquirer](https://github.com/SBoudrias/Inquirer.js): `^8.2.4`：交互式命令行用户界面，在命令工具中可提供交互
- [ejs](https://github.com/tj/ejs)： `^3.1.8`：嵌入式JavaScript模板
- [chalk](https://github.com/chalk/chalk)： `^5.0.1`：设置终端字符串样式
- [mkdirp](https://github.com/substack/node-mkdirp):`^1.0.4`:递归mkdir

## 三.特别说明

在开始之前，需要了解`nodejs`基础知识，常用`shell`执行命令，和`javascript`基础知识！！！
本文将从零到一完整讲解脚手架开发过程，以`Vite + React18.0`为模板案例，不会完整开发类似`vue-cli` 的所有功能！你可按照此文优化完善自己的脚手架代码。

## 四.构建项目

现在正式开始构建脚手架项目，可根据自己熟悉方式创建，直接创建项目文件夹

```shell
# 创建项目文件夹 名称为 my-cli 可自定义
mkdir my-cli
# 初始化 npm 根据自己的需求填写对应信息，也可以直接默认
npm init
```

## 五.安装依赖

```shell
yarn add commander execa inquirer chalk mkdirp
# or npm 安装 
npm install commander execa inquirer chalk mkdirp
```

## 六.目录说明

完整目录，如下所示，可根据目录设计添加对应文件。

```shell
my-cli # 项目名称
└── bin # 主目录
    ├── commands # 命令文件
    │   ├── options # 命令所有选项
    │   │   ├── create.js # 创建命令
    │   │   ├── help.js # 帮助命令
    │   │   ├── help.js # 导出所有命令文件
    │   ├── index.js # 导出command命令方法
    ├── inquirers # 交互式命令文件
    │   ├── options # 交互式命令所有选项
    │   │   ├── common.js # 公共交互式命令
    │   │   ├── react.js # react相关命令
    │   │   ├── index.js # 导出所有交互式命令文件
    │   ├── index.js # 导出command命令方法
    ├── templates # 所有模板文件
    │   ├── react # react相关模板
    │   ├── vue # vue相关模板
    ├── utils # 工具类
    │   ├── index.js # 工具类处理函数
    ├── index.js # 入口文件
```

完整代码：[my-cli](https://github.com/hu-snail/my-cli)

## 七.实战

在开始前，我们需要修改`package.json`文件，增加`"bin": "./bin/index.js"`：发布到npm设置执行入口文件; `"type": "module"`:表示允许执行export、import操作;`"start": "node ./bin/index.js"`:做本地测试使用，表示执行脚手架入口文件

```json
{
  + "bin": "./bin/index.js",
  + "type": "module",
  "scripts": {
    - "test": "echo \"Error: no test specified\" && exit 1",
    + "start": "node ./bin/index.js"
  }
}
```

### (一).入口文件
首先从入口文件开始分析，需要的模块逐步完善。目录路径：`bin/index.js`

```js
#! /usr/bin/env node
// 引入 fs模 块
import fs, { mkdirSync } from "fs";
// 引入 path 模块
import path from "path";

// 引入 commands 相关命令方法
import commands from "./commands/index.js";
// 获取用户输入、选择项
let config = await command();
```

需要注意的是`#! /usr/bin/env node` 表示执行环境为node，引入`fs`文件系统模块，创建文件项目会涉及到文件相关读取写能力；引入`path`读取文件路径。`commands`执行命令；通过`let config = await command();`获取用户输入、选择项；这一步涉及到`commands`所以接下来开始分析：`bin/commands/index.js`用户输入命令模块

### (二).命令文件

目录路径：`bin/commands/index.js`

```js
// 引入 commander 命令
import { program } from "commander";
import chalk from "chalk";
// 导入 create创建命令 help帮助命令
import { create, help } from "./options/index.js";

export default async (call) => {
  return new Promise((resolve, reject) => {
    program
      .name(chalk.blue("my-cli"))
      .usage("[global options] command");
    // 版本信息
    program.version("1.0.0");
    // 帮助信息
    program.option("-F, --framework", "surport vue,react");
    // 创建项目命令
    create(program, (item) => {
      resolve(item);
    });
    // 帮助信息
    help(program);
    // 解析指令
    program.parse(process.argv);
  });
};
```

我们需要关注的是`create`、`help`分别是创建命令、帮助命令

### (三).创建命令

`create`创建命令 ，文件路径：`bin/commands/options/create.js`

```js
/**
 * @description 创建项目指令
 * @author hu-snail 1217437592@qq.com
 */

 import inquirer from "inquirer";
 import { changeTemplate, changeVariant, inputProjectName } from "../../inquirers/options/index.js";
 import  {InvalidArgumentError} from "commander";
 import chalk from "chalk";
 import { hasTemplate, getSupportTs } from '../../utils/index.js'
 export default (program, call) => {
   program
     .command("create")
     .argument("<build-method>", "build tools", validatBuildMethod)
     .argument("[app-name]", "app name", validatAppName)
     .description("create a new project powered by my-cli")
     .option("-t, --template <value>", "create a new project by template", validatTemplate)
     .action(async (method, projectName, option) => {
       let item = {};
        // 判断用户是否输入 projectName 
        if (!projectName) {
          item = await inquirer.prompt([inputProjectName(), changeTemplate(), changeVariant()]);
          // string转为boolean
          item.supportTs = item.supportTs === 'true' ? true : false
          return call && call({ method, ...item });
        }
       // 如果用户没有输入 模板参数，则提供项目类型选择 react/vue
       if (!option.template) {
         item = await getFramework(option);
				 item.supportTs = item.supportTs === 'true' ? true : false
       } else {
         item = option;
         item.supportTs = getSupportTs(item.template)
       }
       call && call({ method, projectName, ...item });
     });
 };
 
 /**
  * @description 校验构建方式
  * @param {String} appName 项目名称
  * @returns appName
  */
 function validatBuildMethod(val) {
   if (val === "vite") return val;
   else
     throw new InvalidArgumentError(
       chalk.red(
         `
         "<build-method>构建方式，只支持值为：${chalk.green(
           "vite"
         )}!请重新输入`
       )
     );
 }
 
 /**
  * @description 校验项目名称
  * @param {String} appName 项目名称
  * @returns appName
  */
 function validatAppName(appName) {
   var reg = /^[a-zA-Z][-_a-zA-Z0-9]/;
   if (!reg.test(appName)) {
     throw new InvalidArgumentError(
       chalk.red(`
       <app-name>项目名称必须以字母开头且长度大于2，请重新输入！`)
     );
   }
   return appName;
 }

/**
  * @description 校验模板
  * @param {String} template 模板名称
  * @returns template
  */
 function validatTemplate(template) {
   if (hasTemplate(template)) return template
   else {
    console.log(chalk.white(`error: option '-t, --template <value>' argument '${template}' is invalid`))
   }
 }
 
 async function getFramework() {
   let answer = await inquirer.prompt([changeTemplate(), changeVariant()]);
   return answer;
 }
```

思路分析：

![创建命令分析.svg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f8c89e0022342a8b22e3221bc67111b~tplv-k3u1fbpfcp-watermark.image?)

上图所示，主要分两种情况，当用户完整输入和部分输入参数判。

关于`program`详细分析

`.command("create")`：表示创建一个名为`create`的命令；

`.argument("<build-method>", "build tools", validatBuildMethod)`：其中`argument`:表示参数、`<build-method>`：表示构建方式，必填参数、`build tools`：表示参数描述、`validatBuildMethod`：表示自定义校验方法；

`[app-name]`:表示可选项，项目名称。`<>`:表示必填参数，`[]`:表示可选项

`.description("create a new project powered by my-project-cli")`:表示命令描述

`.option("-t, --template <value>", "create a new project by template")`：表示命令参数、 `"-t, --template <value>"`：表示用户可输入`-t` 和 `--template`：表示template参数、`"create a new project by template"`：表示参数描述；

`.action(async (method, projectName, option) => {})`:表示命令行为事件，其中`method, projectName`:分别代表`<build-method>`构建方式、`<app-name>`项目名称，和顺序关联，可根据自己需求增删参数、`option`：表示参数选项、也就是`"-t, --template <value>"`可根据自己需求定义。

`hasTemplate`、`getSupportTs`：分别表示是否存在模板，获取是否支持ts,在`bin/utils/index.js`可查看其用法

当用户没有完整输入项目框架时，我们会提供`changeTemplate`、`changeVariant`、`inputProjectName`这个时候，就需要用到`inquirer`交互式命令提供选择项。

### (四).公共处理交互式命令

文件路径：`bin/inquirers/options/common.js`

```js
import chalk from "chalk";
export const changeVariant = () => {
    return {
      type: "list",
      name: "supportTs",
      choices: [
        {
          name: 'true',
        },
        {
          name: 'false',
        }
      ],
      message:
        "Support TS(default by javascript)",
    };
  };

  export const inputProjectName = () => {
    return {
      type: "input",
      name: "projectName",
      default: "vite-app-project",
      validate: function (appName) {
        var done = this.async();
        var reg = /^[a-zA-Z][-_a-zA-Z0-9]/;
        if (!reg.test(appName)) {
          done(chalk.red(`<app-name>项目名称必须以字母开头且长度大于2，请重新输入！`));
        }
        done(null, true);
      },
      message:
        "Project name",
    };
  };
```

参数解释，完整参数文档[inpuirer文档](https://github.com/SBoudrias/Inquirer.js#objects)

-   type：表示参数类型，提供`input、number、confirm、list、rawlist、expand、checkbox、password、editor`
-   name：表示参数属性
-   choices：选择项
-   message: 操作提示语
-   de'fa

其中`changeVariant`：选择是否支持ts;`inputProjectName`：输入项目名称

### (五).选择项目框架交互式命令

文件路径：`bin/inquirers/options/template.js`

```js
/**
 * @description 创建项目类型选择
 * @author hu-snail 1217437592@qq.com
 */

 export const changeTemplate = () => {
    return {
      type: "list",
      name: "template",
      choices: [
        {
          name: "react",
        },
        {
          name: "vue",
        },
      ],
      message: "Select a framework",
    };
  };
```

创建命令，到此结束，接下来分析`help`命令

文件路径：`bin/commands/options/help.js`

```js
/**
 * @description 帮助信息
 * @author hu-snail 1217437592@qq.com
 */
 import chalk from "chalk";

 export default (program) => {
   program.addHelpText(
     "after",
     `
       Run ${chalk.green(
         "my-cli <command> --help"
       )} for detailed usage of given command.`
   );
 };
```

`addHelpText`：表示添加帮助文字，`"after"`：表示在之后，可选项`“before”`，效果图如下

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a20766ffdec5429b9eed3ea0774dc024~tplv-k3u1fbpfcp-watermark.image?)
### (六).导出command命令

文件目录：`bin/commands/option/index.js`

```js
/**
 * @description 导出所有命令
 * @author hu-snail 1217437592@qq.com
 */
import create from "./create.js";
import help from "./help.js";
export { create, help };
```

### (七).导出inquirer交互式命令

文件目录：`bin/inquirers/option/index.js`

```js
/**
 * @description 导出用户输入选择项
 * @author hu-snail 1217437592@qq.com
 */
 import { changeTemplate } from "./template.js";
 import { changeVariant, inputProjectName } from './common.js'
 export { changeTemplate, changeVariant, inputProjectName };
```

### (八).工具类代码

```js
export function hasTemplate(template) {
    return ['vue', 'vue-ts', 'react', 'react-ts'].includes(template)
}

export function getSupportTs(template) {
  return ['vue-ts', 'react-ts'].includes(template)
}
```

这两个方法在react命令中使用到，补充！！！

## 八.本地测试

准备完以上代码后，我们开始本地测试，测试目的是检测是否能够正确的返回我们预设的结果，可根据自己的需求定义和完善脚手架。本文只是讲解demo流程！！！

### (一).完整输入

完成输入测试包含正确输入、构建方式有误输入、项目名称不合规输入

js版本完成输入、默认为js版本
```shell
# react 版本
yarn start create vite app-test --template react
# or npm
npm run start create vite app-test--template react
```

效果图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73a75c1c659945478d09261365286392~tplv-k3u1fbpfcp-watermark.image?)

ts版本正确输入

```shell
# react-ts 版本
yarn start create vite app-test --template react-ts
# or npm
npm run start create vite app-test --template react-ts
```

效果图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c590e252b0dd4a058a5941bb4ae7ab27~tplv-k3u1fbpfcp-watermark.image?)

以上结果也就是我们入口文件：`bin/index.js`中`let config = await command();`获取的值

构建方法输入有误`vite1`：为错误输入❌  只支持vite方式构建，可根据自己的需求适配多种构建方式

```shell
yarn start create vite1 app-test
# or npm
npm run start create vite1 app-test
```

效果图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24f3df7ad0db4c96be6f350cc3400d28~tplv-k3u1fbpfcp-watermark.image?)

项目名称不合规输入 `1my-test-project`:为不符合规范名称

```
yarn start create vite 1my-test-project --template react
# or npm
npm run start create vite 1my-test-project --template react
```

效果图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e99c8830e32a411d823af336fa99c9a2~tplv-k3u1fbpfcp-watermark.image?)
### (二).不完整输入

包含构建方式不输入、名称不输入、项目框架方式不输入

构建方式不输入会直接导致报错，重点是名称不输入、项目框架方式不输入，这时会给用户提供选择

项目名称不输入

```shell
yarn start create vite 
# or npm
npm run start create vite 
```

效果图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4616d60404f847229a0a603bb71e2ecc~tplv-k3u1fbpfcp-watermark.image?)

项目名称不输入会提供默认值和输入给用户，同时完成项目框架选择、和是否支持ts选择。完整截图如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d65ac93bbb9b442eb1c4416cd14f6146~tplv-k3u1fbpfcp-watermark.image?)

这个结果也就是我们入口文件：`bin/index.js`中`let config = await command();`获取的值

项目框架方式不输入

```shell
yarn start create vite app-test 
# or npm
npm run start create vite app-test 
```

效果图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e55551da5f6541e4a3a4da010b1043c0~tplv-k3u1fbpfcp-watermark.image?)

不输入项目框架会提供选择，同时选择是否支持ts,完整截图如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50a9aed34088467998eb9a5766accd12~tplv-k3u1fbpfcp-watermark.image?)

到此结束测试，你可以根据这个思路完善自己的脚手架，接下来开始模板生成

## 九.导入Vite + react18模板

当我们能获取到用户输入选择的值后，就可根据用户输入的参数生成对应的项目模板，本文以`vite+reat18`为例

在`bin/templates`目录下创建React模板文件，完整目录如下：

```
bin
├── templates # 所有模板文件
│   ├── react # react相关模板
│   │   ├── src # react主要文件
│   │   │   ├── App.css # App 样式文件
│   │   │   ├── App.jsx.ejs # App 模板文件
│   │   │   ├── index.css # 首页样式文件
│   │   │   ├── main.js.ejs # main 模板文件
│   │   │   ├── logo.svg # react logo文件
│   │   ├── .gitignore # git忽略配置文件
│   │   ├── index.html.ejs # react首页ejs模板
│   │   ├── package.json.ejs # package.json ejs模板
│   │   ├── tsconfig.json # ts 配置文件
│   │   ├── tsconfig.node.json # tsconfig node配置文件
│   │   ├── vite.config.js.ejs # vite.config ejs模板
```

具体代码，查看完整代码：<https://github.com/hu-snail/my-cliru>

如果实现`vite + vue3`可参考此方法生成对应模板

模板技巧：不需要动态改变文件，直接使用原后缀名，例如：静态资源(图、视频、音等资源)、需要动态改变的文件，保留原来的后缀名，在其基础上添加`.ejs`：例如（`package.json` → `package.json.ejs`）这样的好处是，知道原来的文件类型，方便更快的处理

## 十.创建生成模板代码

完成模板之后，开始重点环节，根据用户输入选择参数动态生成项目模板，跟着我的步骤完成生成模板语法

### 第一步：创建build文件夹

在`bin/`创建build文件，用于存放生成模板文件和生成配置文件，目录如下：

```shell
bin
├── build # 生成模板文件
    ├── config.js # 模板配置文件
    ├── react.js # 生成react模板文件
```

### 第二步： config配置

因为脚手架内置了支持`ts`和`js`,所有存在差异化，具体配置如下：

```js
/**
 * @description js需要忽略的文件
 */
export const jsignoreFile = [
    'tsconfig.json',
    'tsconfig.node.json'
]
```

其中模板中的`tsconfig.json`、 `tsconfig.node.json`ts才存在，所以在js需要忽略。可按照此方式区分文件之间的差异化。

### 第三步：react生成模板

准备完以上内容后，接下正式开始生成模板，文件路径：`bin/build/react.js`

```javascript
/**
 * @description 生成react模板
 * @author hu-snail 1217437592@qq.com
 */

import fs from 'fs'
import mkdirp from "mkdirp";
import { getFiles, copyFile, getCode } from '../utils/index.js'
import { jsignoreFile } from './config.js'
```

代码分析：

代码中导入了`getFiles`、`copyFile`、`getCode`三个方法，分别代表获取文件、拷贝文件、获取代码。首先从这三个方法开始分析，文件路径：`bin/utils/index.js` 。

#### 1).getFiles 获取文件

```js
import fs from "fs";
let files = []
let dirs = []
export function getFiles(template, dir) {
const templatePath = `./bin/templates/${template}/`
const rootFiles = fs.readdirSync(templatePath, 'utf-8')
rootFiles.map(item => {
  const stat = fs.lstatSync(templatePath + item)
  const isDir = stat.isDirectory()
  if (isDir) {
    const itemDir = `${template}/${item}/`.replace(/react\//g, '')
    dirs.push(itemDir)
    getFiles(`${template}/${item}`, itemDir)
  } else files.push((dir ? dir : '') + item)
})
return {files, dirs}
}
```

代码分析：

该函数提供两个参数，分别是`template`、`dir`，表示模板、目录，同时在方法前定义了两个变量`files`、`dirs`分别表示文件、目录，主要作用区分文件和目录，这样方便用于生成目录和创建文件。

-   templatePath：表示模板地址，根据传入`template`动态配置
-   rootFiles：表示所有模板文件，通过`fs.readdirSync`读取
-   stat：表示文件信息，通过`fs.lstatSync`获取
-   isDir： 表示是否目录，通过`stat.isDirectory()`判断，如果是则递归该目录下的所有文件
-   itemDir：表示层级目录，会把上一层接口也接入

#### 2).copyFile拷贝文件

```js
import fs from "fs"; 
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);
/**
  * @description 复制文件，比如图片/图标静态资源
  * @param {*} rootPath 根目录
  * @param {*} template 模板
  * @param {*} item 静态模板文件
  */
 export function copyFile(rootPath, template, item) {
   const fromFileName = path.resolve(
     __dirname,
     `../../templates/${template}/${item}`
   );
   const toFileName = `${rootPath}/${item}`;
   const rs = fs.createReadStream(fromFileName, {
     autoClose: true,
     encoding: "utf-8",
     highWaterMark: 64 * 1024 * 1024,
     flags: "r",
   });
   const ws = fs.createWriteStream(toFileName, {
     encoding: "utf-8",
     flags: "a",
     highWaterMark: 16 * 1024 * 1024,
     autoClose: true,
   });
   rs.on("data", (chunk) => {
     const wsFlag = ws.write(chunk, "utf-8");
     if (!wsFlag) {
       rs.pause();
     }
   });
   ws.on("drain", () => {
     // 继续读取
     rs.resume();
   });
 
   rs.on("end", () => {
     ws.end();
   });
 }
```

代码分析：

该函数提供三个参数`rootPath` 、`template`、`item`，分别表示根目录，模板名称、静态模板路径。

-   fromFileName：表示读取文件地址
-   toFileName：表示拷贝至地址
-   rs：表示读取文件流，通过`fs.createWriteStream`创建
-   ws：表示写入文件流，通过`fs.createWriteStream`创建

#### 3).getCode获取代码

```js
import ejs from "ejs";
import fs from "fs";
/**
  * @description 解析ejs模板
  * @param {Object} config
  * @param {String} templateName
  * @param {String} templatePath
  * @returns code
  */
 export function getCode(config, templateName, templatePath) {
   const template = fs.readFileSync(
     path.resolve(__dirname, `../../templates/${templateName}/${templatePath}`)
   );
   const code = ejs.render(template.toString(), {
     ...config,
   });
   return code;
 }
```

代码分析：

该函数接受三个参数`config`、`templateName`、 `templatePath`：分别表示配置信息、模板名称、模板地址

-   template：模板文件，通过`fs.readFileSync`读取
-   code: 模板代码，通过`ejs.render`提供生成
-   ...config： 用户输入选择的参数值,通过此参数动态生成对应模板

### 第四步 分析createReact函数

分析完工具函数代码之后，我们正式分析主函数`createReact`

```js
/**
 * @description 生成react模板
 * @author hu-snail 1217437592@qq.com
 */

import fs from 'fs'
import mkdirp from "mkdirp";
import { getFiles, copyFile, getCode } from '../utils/index.js'
import { jsignoreFile } from './config.js'
export const createReact = (config, rootPath) => {
   // 创建项目
   mkdirp.sync(rootPath)
   const { template, supportTs } = config
   const reactTemplate = (template === 'react' || template === 'react-ts') ? 'react' : ''
   const { files, dirs } = getFiles(reactTemplate)
   // 创建文件夹
   dirs.map(item => {
    mkdirp.sync(`${rootPath}/${item}`)
   })

   files.map(item => {
    const isEjs = item.indexOf('.ejs') !== -1
    // 对模板文件进行操作
    if (isEjs) {
       const fileTyep = supportTs ? 'ts' : 'js'
       // 去掉ejs后缀
       const newItem = item.replace(/.ejs/g, '')
       // json后缀名不需要处理
       const isJson = newItem.indexOf('.json') !== -1
       // 替换后缀名
       const newFilePath = isJson ? newItem : newItem.replace(/js/g, fileTyep)
       // 写入相关模板文件
      fs.writeFileSync(
         `${rootPath}/${newFilePath}`,
         getCode(config, reactTemplate, item)
       )
    } else {
       // 如果不是ejs模板，直接复制文件 
       if (supportTs) copyFile(rootPath, reactTemplate, item)
       else {
         // 判断是否存在js需要忽略的文件，即存在ts文件
         const hasTsFile = jsignoreFile.includes(item)
         if (!hasTsFile) copyFile(rootPath, reactTemplate, item)
       }
    }
   })
    return ''
}
```

代码分析：

该函数接受两个参数`config`、 `rootPath`：分别表示用户输入选择参数值配置、项目根目录。

-   mkdirp.sync(rootPath)：通过mkdirp创建项目目录
-   reactTemplate：通过`template`传入的值`react`、`react-ts` 统一react传入，因为模板目录只有react,可根据自己需求调整

其他项有代码注释，不一一赘述

### 第五步 模板动态配置

作为测试，我们对`package.json.ejs`和`index.html.ejs`进行动态配置，分别对应的目录`bin/templates/react/package.json.ejs`、`bin/templates/react/index.html.ejs`

package.json.ejs：代码

```json
{
  "name": "<%= projectName %>",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^1.3.0",
    <%_ if (supportTs) { -%>
    "typescript": "^4.6.3",
    <%_ } -%>
    "vite": "^2.9.9"
  }
}
```

根据`supportTs`：判断是否需要`"typescript"`，需要注意的`<%_ -%>`:语法会删除多余空行，如果使用`<% %>`:会导致留白，可以自行测试,`"name": "<%= projectName %>"`:根据创建的项目名称生成

index.html.ejs：代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= projectName %></title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

动态生成 `<title><%= projectName %></title>`

以上模板只是测试，可根据ejs模板语法，动态生成你需要的值

### 第五步 入口文件执行模板生成

接下来将在入口文件，执行我们的`createReact`函数

```js
#! /usr/bin/env node
/**
 * @description 脚手架入口文件
 * @author hu-snail 1217437592@qq.com
 */
 import fs, { mkdirSync } from "fs";
 import path from "path";

 import command from "./commands/index.js";
 import { createReact } from './build/react.js'

 let config = await command();

 var currentPath = path.resolve("./");

 createReact(config, getRootPath())

 function getRootPath() {
    return `${currentPath}/${config.projectName}`;
 }
```

## 生成模板演示

现在可以看看具体效果

### (一).js版本

```shell
yarn start create vite app-test -t react
```

效果图


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7eb7a16acdfe44aeba0b18776abc5230~tplv-k3u1fbpfcp-watermark.image?)

生成目录

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bbafe1b47c746629d041950e733dfd2~tplv-k3u1fbpfcp-watermark.image?)

package.json文件

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f04a1baddc96407999200518b4136960~tplv-k3u1fbpfcp-watermark.image?)

index.hml文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/098ab5470b79430ea51070d764e1581f~tplv-k3u1fbpfcp-watermark.image?)

### (二).ts版本

```shell
yarn start create vite app-test -t react-ts
```

效果图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d7cb158027e46fab2be2fac39d33f3a~tplv-k3u1fbpfcp-watermark.image?)

生成目录

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dc62f17d6404f9e824215af8272ac95~tplv-k3u1fbpfcp-watermark.image?)

package.json文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/087d63ff997d488a9ce39f624cbf0611~tplv-k3u1fbpfcp-watermark.image?)

index.hml文件相同

## 转发申明
原创不易，转发请标明原文地址！！！
