import { h } from 'vue'
import Markdown from "@/components/Markdown.vue";

const md = (string, attributes, toc) => h(Markdown, { content: string, attributes, toc, key: string });
const modules = import.meta.glob('../../markdown/**.md')

let mdList = []
for (const key in modules) {
  const { html, attributes, toc } = await modules[key]()
  const Doc = md(html, attributes, toc)
  const { path, name } = attributes
  mdList.push({ path, component: Doc, name })
}
import ButtonDoc from "@/views/doc/button/index.vue";

const docMenus = {
  指南: mdList,
  Javascript: [
    { path: "button", component: ButtonDoc, name: "日期时间 DataTime" }
  ]
}

let docRoutes = [];
for (let i in docMenus) {
  docRoutes = [...docRoutes, ...docMenus[i]];
}

export { docRoutes, docMenus };