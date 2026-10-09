import { h, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import LanguageSwitch from './components/LanguageSwitch.vue'
import Home from './components/Home.vue'
import TutorialPicker from './components/TutorialPicker.vue'

import { initTableScroll } from './table-scroll'

import './style.css'

export default {
  extends: DefaultTheme,

  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LanguageSwitch)
    }),

  enhanceApp({ app }) {
    app.component('SensorHome', Home)
    app.component('TutorialPicker', TutorialPicker)
  },

  setup() {
    const route = useRoute()

    onMounted(async () => {
      await nextTick()
      initTableScroll()
    })

    watch(
      () => route.path,
      async () => {
        await nextTick()
        initTableScroll()
      }
    )
  }
}