import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const read=relative=>JSON.parse(fs.readFileSync(path.join(root,relative),'utf8'))
const env=read('docs/_data/environments.json')
const products=fs.readdirSync(path.join(root,'docs/_data/products')).filter(f=>f.endsWith('.json')).map(f=>read('docs/_data/products/'+f)).sort((a,b)=>a.order-b.order)
const generated=[]
function emit(relative,content){const file=path.join(root,relative);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);generated.push(relative)}
function include(file,fragment){const relative=path.relative(path.dirname(path.join(root,file)),path.join(root,fragment)).split(path.sep).join('/');return `<!--@include: ${relative}-->`}
const seen=new Set()
for(const product of products){
 if(!/^[A-Za-z0-9-]+$/.test(product.slug)||seen.has(product.slug.toLowerCase()))throw Error('Invalid or duplicate product slug: '+product.slug)
 seen.add(product.slug.toLowerCase())
 if(!/^[A-Za-z0-9/-]+$/.test(product.routeBase)||product.routeBase.includes('..'))throw Error('Invalid routeBase: '+product.slug)
 for(const locale of ['zh','en']){
  const prefix=locale==='en'?'en/':''
  const intro=`docs/_content/products/${product.slug}.${locale}.md`
  if(!fs.existsSync(path.join(root,intro)))throw Error('Missing product introduction: '+intro)
  const overview=`docs/${prefix}products/${product.slug}.md`
  const home=locale==='en'?'/en/':'/'
  emit(overview,`---\ntitle: ${JSON.stringify(product.name[locale])}\n---\n<!-- Generated route. Edit docs/_content and docs/_data. -->\n\n# ${product.name[locale]}\n\n${include(overview,intro)}\n\n[${locale==='en'?'Choose a learning path on the home page':'回首頁選擇教學路徑'}](${home})\n`)
  for(const [controller,languageIds] of Object.entries(product.support||{})){
   const control=env.controllers.find(c=>c.id===controller)
   if(!control||!Array.isArray(languageIds))throw Error('Invalid controller support: '+product.slug)
   for(const language of languageIds){
    const lang=env.languages.find(l=>l.id===language)
    if(!lang)throw Error('Invalid language: '+product.slug+'/'+language)
    const lesson=`docs/_content/tutorials/${product.slug}/${controller}-${language}.${locale}.md`
    if(!fs.existsSync(path.join(root,lesson)))throw Error('Missing tutorial: '+lesson)
    const file=`docs/${prefix}${product.routeBase}/${controller}-${language}.md`
    const title=product.name[locale]+' · '+control.name+' · '+lang.name
    emit(file,`---\ntitle: ${JSON.stringify(title)}\n---\n<!-- Generated route. Edit docs/_content and docs/_data. -->\n\n# ${title}\n\n${include(file,intro)}\n\n${include(file,lesson)}\n`)
   }
  }
 }
}
const manifest=path.join(root,'scripts/generated-routes.json')
if(fs.existsSync(manifest))for(const stale of JSON.parse(fs.readFileSync(manifest,'utf8'))){if(!generated.includes(stale)&&stale.startsWith('docs/')&&stale.endsWith('.md')&&!stale.includes('..'))fs.rmSync(path.join(root,stale),{force:true})}
fs.writeFileSync(manifest,JSON.stringify(generated,null,2)+'\n')
fs.rmSync(path.join(root,'docs/.vitepress/dist'),{recursive:true,force:true})
console.log(`Prepared ${generated.length} documentation routes for ${products.length} products.`)
