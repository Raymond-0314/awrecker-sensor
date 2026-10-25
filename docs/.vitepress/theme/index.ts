import { h, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import LanguageSwitch from './components/LanguageSwitch.vue'
import Home from './components/Home.vue'
import TutorialPicker from './components/TutorialPicker.vue'

import { initTableScroll } from './table-scroll'

import './style.css'
import DownloadButton from './components/DownloadButton.vue'
import Sensor8 from './components/Sensor8.vue'
import Sensor16 from './components/Sensor16.vue'

export default {
  extends: DefaultTheme,

  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LanguageSwitch)
    }),

  enhanceApp({ app }) {
    app.component('SensorHome', Home)
    app.component('TutorialPicker', TutorialPicker)
    app.component('DownloadButton', DownloadButton)
    app.component('Sensor8', Sensor8)
    app.component('Sensor16', Sensor16)
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