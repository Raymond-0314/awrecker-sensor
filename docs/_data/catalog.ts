import environments from './environments.json'
const entries=import.meta.glob('./products/*.json',{eager:true,import:'default'})
export const products=Object.values(entries).sort((a:any,b:any)=>a.order-b.order) as any[]
export const controllers=environments.controllers
export const languages=environments.languages
export function supportedLanguages(product:any,controller:string):string[]{return product?.support?.[controller]||[]}
export function tutorialPath(product:any,controller:string,language:string,en=false){
 if(!supportedLanguages(product,controller).includes(language))return ''
 return `${en?'/en':''}/${product.routeBase}/${controller}-${language}.html`
}
