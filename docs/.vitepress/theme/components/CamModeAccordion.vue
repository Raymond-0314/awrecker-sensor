<script setup>
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'

const root = ref(null)
const activeMode = ref('')
let mounted = false

async function openMode(mode, scroll = true) {
  const target = root.value?.querySelector(`#cam-mode-${mode}`)
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
  const match = window.location.hash.match(/^#cam-mode-(\d{2})$/)
  if (match) openMode(match[1])
  else activeMode.value = ''
}

function onClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
      event.metaKey || event.shiftKey || event.altKey) return
  const link = event.target.closest?.('a[href^="#cam-mode-"]')
  const match = link?.getAttribute('href')?.match(/^#cam-mode-(\d{2})$/)
  if (!match || !root.value?.querySelector(`#cam-mode-${match[1]}`)) return
  event.preventDefault()
  const hash = link.getAttribute('href')
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, '', hash)
  }
  openMode(match[1])
}

provide('cam-mode-accordion', {
  activeMode,
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
