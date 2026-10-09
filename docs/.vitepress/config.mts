import { defineConfig } from 'vitepress'
export default defineConfig({
 title:'AWRECKER Sensors', description:'產品介紹、使用手冊與程式範例 / Product documentation and examples',
 base:process.env.PAGES_BASE || '/', appearance:'dark', cleanUrls:false, srcExclude:['_content/**'],
 head:[['link',{rel:'icon',href:`${process.env.PAGES_BASE || '/'}/images/icon/icon.png`}]],
 locales:{root:{label:'繁體中文',lang:'zh-Hant',themeConfig:{langMenuLabel:'選擇語言'}},en:{label:'English',lang:'en'}},
 themeConfig:{logo:'/images/icon/icon.png',siteTitle:'AWRECKER',nav:[],sidebar:false,outline:false,docFooter:{prev:false,next:false}}
})
