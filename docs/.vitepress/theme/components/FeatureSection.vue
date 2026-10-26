<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useData } from 'vitepress'

defineProps<{
  cards: {
    title: string
    items: string[]
  }[]
}>()

const { lang } = useData()

const isEnglish = computed(() =>
  lang.value.startsWith('en')
)

const scrollArea = ref<HTMLDivElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

let resizeObserver: ResizeObserver | undefined

function updateArrows() {
  const el = scrollArea.value
  if (!el) return

  canScrollLeft.value = el.scrollLeft > 2

  canScrollRight.value =
    el.scrollWidth - el.clientWidth - el.scrollLeft > 2
}

function scrollCards(direction: number) {
  const el = scrollArea.value
  if (!el) return

  const card = el.querySelector<HTMLElement>('.feature-box')
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  const distance = card
    ? card.getBoundingClientRect().width + gap
    : el.clientWidth * 0.85

  el.scrollBy({
    left: direction * distance,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
  })
}

onMounted(() => {
  const el = scrollArea.value
  if (!el) return

  resizeObserver = new ResizeObserver(updateArrows)
  resizeObserver.observe(el)

  updateArrows()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="feature-scroll-wrapper">
    <div
      ref="scrollArea"
      class="feature-grid"
      @scroll.passive="updateArrows"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="feature-box"
      >
        <strong>{{ card.title }}</strong>

        <small>
          <ul>
            <li
              v-for="(item, itemIndex) in card.items"
              :key="itemIndex"
              v-html="item"
            ></li>
          </ul>
        </small>
      </div>
    </div>

    <button
      type="button"
      class="table-scroll-btn left"
      :class="{ visible: canScrollLeft }"
      :aria-label="isEnglish ? 'Scroll left' : '向左捲動'"
      :tabindex="canScrollLeft ? 0 : -1"
      @click="scrollCards(-1)"
    >
      <span class="arrow-icon" aria-hidden="true"></span>
    </button>

    <button
      type="button"
      class="table-scroll-btn right"
      :class="{ visible: canScrollRight }"
      :aria-label="isEnglish ? 'Scroll right' : '向右捲動'"
      :tabindex="canScrollRight ? 0 : -1"
      @click="scrollCards(1)"
    >
      <span class="arrow-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
.feature-scroll-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
}

/* 桌面維持原本卡片排版，不顯示箭頭 */
@media (min-width: 768px) {
  .feature-scroll-wrapper > .table-scroll-btn {
    display: none !important;
  }
}
</style>