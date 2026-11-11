<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useData } from 'vitepress'
const { lang } = useData()
const en = computed(() => lang.value.startsWith('en'))
const area = ref(null)
const left = ref(false)
const right = ref(false)
let observer
function update() {
  const el = area.value
  if (!el) return
  left.value = el.scrollLeft > 2
  right.value = el.scrollWidth - el.clientWidth - el.scrollLeft > 2
}
function move(direction) {
  const el = area.value
  if (!el) return
  const card = el.querySelector('figure')
  const distance = card ? card.getBoundingClientRect().width + 20 : el.clientWidth
  el.scrollBy({ left: direction * distance, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
onMounted(() => {
  observer = new ResizeObserver(update)
  observer.observe(area.value)
  area.value.querySelectorAll('figure').forEach(card => observer.observe(card))
  update()
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="cam-screen-wrapper">
    <div ref="area" class="cam-screen-gallery" role="region" :aria-label="en ? 'Camera screen illustrations' : '相機畫面示意圖'" tabindex="0" @scroll.passive="update">
      <slot />
    </div>
    <button v-for="direction in [-1, 1]" :key="direction" type="button" class="table-scroll-btn" :class="[direction < 0 ? 'left' : 'right', { visible: direction < 0 ? left : right }]" :disabled="direction < 0 ? !left : !right" :aria-hidden="direction < 0 ? !left : !right" :tabindex="(direction < 0 ? left : right) ? 0 : -1" :aria-label="en ? (direction < 0 ? 'Scroll illustrations left' : 'Scroll illustrations right') : (direction < 0 ? '向左滑動圖片' : '向右滑動圖片')" @click="move(direction)">
      <span class="arrow-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>
