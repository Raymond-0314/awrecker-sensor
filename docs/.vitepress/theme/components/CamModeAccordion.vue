<script setup>
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'

const root = ref(null)
const props = defineProps({ namespace: { type: String, default: '' } })
const sectionId = mode => `cam-mode-${props.namespace ? `${props.namespace}-` : ''}${mode}`
function modeFromHash(hash) {
  const prefix = `#${sectionId('')}`
  const mode = hash?.startsWith(prefix) ? hash.slice(prefix.length) : ''
  return /^\d{2}$/.test(mode) ? mode : ''
}
const activeMode = ref('')
let mounted = false

async function openMode(mode, scroll = true) {
  const target = root.value?.querySelector(`#${sectionId(mode)}`)
  if (!target) return
  activeMode.value = mode
  await nextTick()
  if (!mounted || !scroll) return
  await new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
  if (!mounted || activeMode.value !== mode) return
  target.querySelector('button')?.focus({ preventScroll: true })
  target.scrollIntoView({ block: 'start', behavior: 'instant' })
}

function readHash() {
  const mode = modeFromHash(window.location.hash)
  if (mode) openMode(mode)
  else activeMode.value = ''
}

function onClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
      event.metaKey || event.shiftKey || event.altKey) return
  const link = event.target.closest?.('a[href^="#cam-mode-"]')
  const mode = modeFromHash(link?.getAttribute('href'))
  if (!mode || !root.value?.querySelector(`#${sectionId(mode)}`)) return
  event.preventDefault()
  const hash = link.getAttribute('href')
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, '', hash)
  }
  openMode(mode)
}

provide('cam-mode-accordion', {
  activeMode,
  sectionId,
  toggle(mode) {
    if (activeMode.value === mode) activeMode.value = ''
    else openMode(mode)
  }
})

onMounted(() => {
  mounted = true
  window.addEventListener('hashchange', readHash)
  window.addEventListener('popstate', readHash)
  readHash()
})

onUnmounted(() => {
  mounted = false
  window.removeEventListener('hashchange', readHash)
  window.removeEventListener('popstate', readHash)
})
</script>

<template>
  <div ref="root" class="cam-mode-reference" @click.capture="onClick">
    <slot />
  </div>
</template>

<style scoped>
.cam-mode-reference {
  overflow-anchor: none;
}
</style>
