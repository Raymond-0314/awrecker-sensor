<script setup>
import {computed,ref,onMounted,onBeforeUnmount,nextTick} from 'vue'
import {useData,withBase} from 'vitepress'
import {products as catalogProducts} from '../../../_data/catalog'
const {lang}=useData();const en=computed(()=>lang.value==='en')
const products=computed(()=>catalogProducts.map(p=>({...p,name:p.name[en.value?'en':'zh'],desc:p.summary[en.value?'en':'zh'],alt:p.imageAlt[en.value?'en':'zh']})))
const track=ref(null),dialog=ref(null),selected=ref(null),canPrev=ref(false),canNext=ref(false)
let observer;let previousOverflow='';let trigger=null
const selectedProduct=computed(()=>selected.value||products.value[0])
function updateScroll(){const el=track.value;if(el){canPrev.value=el.scrollLeft>2;canNext.value=el.scrollLeft+el.clientWidth<el.scrollWidth-2;const image=el.querySelector('.product-image');if(image){el.parentElement.style.setProperty('--image-height',image.clientHeight+'px');el.parentElement.style.setProperty('--arrow-left',Math.max(0,(el.querySelector('.product-item').clientWidth-image.clientWidth)/2-22)+'px')}}}
function slide(direction){const el=track.value;if(!el)return;const item=el.querySelector('.product-item');const step=(item?.getBoundingClientRect().width||el.clientWidth)+parseFloat(getComputedStyle(el).gap||0);el.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
async function open(product,event){selected.value=product;trigger=event.currentTarget;await nextTick();previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.value.showModal()}
function close(){dialog.value?.close()}
function onClose(){document.body.style.overflow=previousOverflow;trigger?.focus()}
onMounted(()=>{observer=new ResizeObserver(updateScroll);observer.observe(track.value);updateScroll()})
onBeforeUnmount(()=>{observer?.disconnect();if(dialog.value?.open)document.body.style.overflow=previousOverflow})
</script>
<template>
<main class="sensor-home"><section id="products" class="products shell">
 <div class="section-heading"><div><h1>{{en?'MBC Product Manual':'MBC 產品說明書'}}</h1><div class="eyebrow">{{en?'“The Sensors You Must Have”':'「你必須擁有的感應器」'}}</div></div><span class="section-count">{{String(products.length).padStart(2,'0')}} {{en?'PRODUCTS':'款產品'}}</span></div>
 <div class="collection-carousel" :class="{'can-prev':canPrev,'can-next':canNext,'many-products':products.length>3}">
  <div class="product-track" ref="track" @scroll="updateScroll" role="region" :aria-label="en?'Product collection':'產品展示'" @keydown.left.prevent="slide(-1)" @keydown.right.prevent="slide(1)">
   <button v-for="p in products" :key="p.slug" type="button" class="product-item" :data-product="p.slug" :data-name="p.name" :aria-label="(en?'View product: ':'產品瀏覽：')+p.name" @click="open(p,$event)">
    <span class="product-image">
     <img :src="withBase(p.image)" :alt="p.alt" loading="lazy" draggable="false">
     <span class="quick-view">{{en?'Quick View':'產品瀏覽'}}</span>
    </span>
    <span class="product-name">{{p.name}}</span><span class="product-description">{{p.desc}}</span>
   </button>
  </div>
  <div class="carousel-controls"><button type="button" data-slide="-1" :disabled="!canPrev" @click="slide(-1)" :aria-label="en?'Previous product':'上一個產品'">‹</button><button type="button" data-slide="1" :disabled="!canNext" @click="slide(1)" :aria-label="en?'Next product':'下一個產品'">›</button></div>
 </div>
 <dialog ref="dialog" class="product-dialog" aria-labelledby="product-dialog-title" @close="onClose" @click="event=>{if(event.target===dialog)close()}">
  <div class="dialog-header"><div><h2 id="product-dialog-title">{{selectedProduct.name}}</h2></div><button type="button" class="dialog-close" @click="close" :aria-label="en?'Close selection':'關閉選擇視窗'">×</button></div>
  <TutorialPicker :key="selectedProduct.slug" :product="selectedProduct.slug" @confirmed="close" />
 </dialog>
</section></main>
</template>
