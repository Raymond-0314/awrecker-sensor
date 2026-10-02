<script setup>
import {ref,computed,watch} from 'vue'
import {useData,useRouter,withBase} from 'vitepress'
import {products,controllers,languages,supportedLanguages,tutorialPath} from '../../../_data/catalog'
const props=defineProps({product:{type:String,default:'S8'}})
const emit=defineEmits(['confirmed'])
const {lang}=useData();const en=computed(()=>lang.value==='en');const router=useRouter()
const controller=ref('spike'),language=ref('python')
const config=computed(()=>products.find(p=>p.slug===props.product))
const available=computed(()=>supportedLanguages(config.value,controller.value))
function controllerEnabled(id){return supportedLanguages(config.value,id).length>0}
watch([config,controller],()=>{
 if(!controllerEnabled(controller.value))controller.value=controllers.find(c=>controllerEnabled(c.id))?.id||''
 if(!supportedLanguages(config.value,controller.value).includes(language.value))language.value=supportedLanguages(config.value,controller.value)[0]||''
},{immediate:true})
const target=computed(()=>config.value?tutorialPath(config.value,controller.value,language.value,en.value):'')
const note=computed(()=>config.value?.compatibilityNote?.[en.value?'en':'zh']||'')
function go(){if(!target.value)return;emit('confirmed');router.go(withBase(target.value))}
</script>
<template><section class="tutorial-picker" aria-labelledby="picker-title"><div class="eyebrow">YOUR NEXT STEP</div><fieldset><legend>{{en?'Select Your Controller':'選擇你的控制器'}}</legend><div class="choice-row"><label v-for="c in controllers" :key="c.id" class="choice" :class="{selected:controller===c.id,disabled:!controllerEnabled(c.id)}"><input type="radio" name="controller" :value="c.id" v-model="controller" :disabled="!controllerEnabled(c.id)"><span>{{c.name}}</span></label></div></fieldset><fieldset><legend>{{en?'Select Your Programming Language':'選擇你的程式語言'}}</legend><div class="choice-row languages"><label v-for="l in languages" :key="l.id" class="choice" :class="{selected:language===l.id,disabled:!available.includes(l.id)}"><input type="radio" name="language" :value="l.id" v-model="language" :disabled="!available.includes(l.id)"><span>{{l.name}}</span></label></div></fieldset><div class="picker-footer"><span>{{target?(controllers.find(c=>c.id===controller)?.name+' / '+languages.find(l=>l.id===language)?.name):(en?'No learning paths available':'目前沒有可選教學路徑')}}</span><button class="primary-link" :disabled="!target" @click="go">{{en?'View product & tutorial':'確認，瀏覽產品與教學'}}</button></div></section></template>
