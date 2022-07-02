import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import createBlockTitle from "./plugins/createBlockTitle";
import mdPlugin, { Mode } from 'vite-plugin-markdown'
import createRenderer from './plugins/mdRender'
const markdownIt = require('markdown-it');
import { containerPlugin, highlight, highlightLinePlugin, headingPlugin } from './plugins/markdown'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      views: path.resolve(__dirname, 'src/views'),
      styles: path.resolve(__dirname, 'src/styles'),
      docs:  path.resolve(__dirname, 'docs'),
      markdown:  path.resolve(__dirname, 'markdown'),
      plugins:  path.resolve(__dirname, 'plugins'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(), 
    mdPlugin({ 
      mode: [Mode.HTML, Mode.TOC, Mode.VUE],
      markdown: (content) => {
        console.log('---')
        return createRenderer(content)
      },
      markdownIt: markdownIt({html: true, highlight})
                  .use(containerPlugin)
                  .use(highlightLinePlugin)
                  .use(headingPlugin)
    }),
    createBlockTitle
  ]
})
