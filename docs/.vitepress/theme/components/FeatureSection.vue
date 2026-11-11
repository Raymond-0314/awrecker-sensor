<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useData } from 'vitepress'

defineProps<{
  horizontal?: boolean
  cards: {
    title: string
    image?: string
    imageAlt?: string
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
  <div class="feature-scroll-wrapper" :class="{ horizontal }">
    <div
      ref="scrollArea"
      class="feature-grid"
      :tabindex="horizontal ? 0 : undefined"
      :role="horizontal ? 'region' : undefined"
      :aria-label="horizontal ? (isEnglish ? 'Feature cards, scroll horizontally' : '功能卡片，可左右滑動') : undefined"
      @scroll.passive="updateArrows"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="feature-box"
      >
        <strong>{{ card.title }}</strong>

        <img
          v-if="card.image"
          class="feature-illustration"
          :src="card.image"
          :alt="card.imageAlt || card.title"
          loading="lazy"
          width="480"
          height="400"
        >

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
.feature-illustration {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 6 / 5;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  margin: 16px 0;
}

.feature-scroll-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
}

/* 桌面維持原本卡片排版，不顯示箭頭 */
@media (min-width: 768px) {
  .feature-scroll-wrapper:not(.horizontal) > .table-scroll-btn {
    display: none !important;
  }
}

.feature-scroll-wrapper.horizontal .feature-grid {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  padding: 2px;
}
.feature-scroll-wrapper.horizontal .feature-grid::-webkit-scrollbar { display: none; }
.feature-scroll-wrapper.horizontal .feature-box {
  flex: 0 0 min(300px, 85%);
  width: 300px;
  min-width: 0;
  box-sizing: border-box;
  scroll-snap-align: start;
}
.feature-scroll-wrapper.horizontal .feature-grid:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
