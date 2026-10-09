import { defineConfig } from 'vitepress'

const base = process.env.PAGES_BASE || '/'

export default defineConfig({
  title: 'AWRECKER Sensors',
  description: '產品介紹、使用手冊與程式範例 / Product documentation and examples',
  base,
  appearance: 'dark',
  cleanUrls: false,
  srcExclude: ['_content/**'],

  head: [
    ['link', {
      rel: 'icon',
      href: `${base}images/icon/icon.png`
    }]
  ],

  locales: {
    root: {
      label: '繁體中文',
      lang: 'zh-Hant',
      themeConfig: {
        langMenuLabel: '選擇語言'
      }
    },
    en: {
      label: 'English',
      lang: 'en'
    }
  },

  themeConfig: {
    logo: `/images/icon/icon.png`,
    siteTitle: 'AWRECKER',
    nav: [],
    sidebar: false,
    outline: false,
    docFooter: {
      prev: false,
      next: false
    }
  }
})