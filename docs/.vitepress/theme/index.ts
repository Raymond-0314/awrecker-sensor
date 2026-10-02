import { h } from 'vue'
import LanguageSwitch from './components/LanguageSwitch.vue'
import DefaultTheme from 'vitepress/theme'
import Home from './components/Home.vue'
import TutorialPicker from './components/TutorialPicker.vue'
import './style.css'
export default { extends:DefaultTheme, Layout:()=>h(DefaultTheme.Layout,null,{'nav-bar-content-after':()=>h(LanguageSwitch)}), enhanceApp({app}) { app.component('SensorHome',Home); app.component('TutorialPicker',TutorialPicker) } }
