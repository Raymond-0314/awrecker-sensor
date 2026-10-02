<script setup>
import {computed} from 'vue'
import {useData,withBase} from 'vitepress'
const {lang,page}=useData()
const en=computed(()=>lang.value==='en')
const target=computed(()=>{const path=page.value.relativePath.replace(/^en\//,'').replace(/index\.md$/,'').replace(/\.md$/,'.html');return withBase((en.value?'/':'/en/')+path)})
</script>
<template><a class="language-switch" :href="target" :lang="en?'zh-Hant':'en'" :aria-label="en?'切換為繁體中文':'Switch to English'">{{en?'繁體中文':'English'}}</a></template>
