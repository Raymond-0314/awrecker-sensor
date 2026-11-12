<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const accordion = inject('cam-mode-accordion', null)
const sectionId = mode => accordion?.sectionId(mode) || `cam-mode-${mode}`
const en = computed(() => lang.value.startsWith('en'))
const scrollArea = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let resizeObserver

function updateArrows() {
  const el = scrollArea.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 2
  canScrollRight.value = el.scrollWidth - el.clientWidth - el.scrollLeft > 2
}

function scrollCards(direction) {
  const el = scrollArea.value
  if (!el) return
  const card = el.querySelector('.cam-mode-card')
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  const distance = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.85
  el.scrollBy({
    left: direction * distance,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  })
}

onMounted(() => {
  const el = scrollArea.value
  if (!el) return
  resizeObserver = new ResizeObserver(updateArrows)
  resizeObserver.observe(el)
  el.querySelectorAll('.cam-mode-card').forEach(card => resizeObserver.observe(card))
  updateArrows()
})

onBeforeUnmount(() => resizeObserver?.disconnect())
const groups = [
  {
    zh: '模式一：指定顏色追蹤', en: 'Mode 1 — Color tracking',
    modes: [
      [11, '① 最多色', '① Most colors'],
      [12, '② 多色', '② Multiple colors'],
      [13, '③ 標準', '③ Standard'],
      [14, '④ 精細', '④ Fine']
    ]
  },
  {
    zh: '模式二：指定座標取色', en: 'Mode 2 — Coordinate sampling',
    modes: [
      [21, '① 色相', '① Hue'],
      [22, "② 色相 + 飽和", '② Hue and saturation'],
      [23, "③ 色相 + 飽和 + 明度", '③ HSV']
    ]
  },
  {
    zh: '模式三：依序取色號', en: 'Mode 3 — Color order',
    modes: [[30, '無子模式', 'No submode']]
  },
  {
    zh: '模式四：循線', en: 'Mode 4 — Line following',
    modes: [
      [41, '① 黑線', '① Black line'],
      [42, '② 白線', '② White line'],
      [43, '③ 色線', '③ Colored line']
    ]
  },
  {
    zh: '模式五：物體偵測', en: 'Mode 5 — Object detection',
    modes: [[51, '① 物體清單', '① Object list'], [52, '② 物體詳細', '② Object details']]
  }
]
</script>

<template>
  <div class="cam-mode-scroll-wrapper">
    <div
      ref="scrollArea"
      class="cam-mode-overview"
      role="region"
      :aria-label="en ? 'Camera mode cards, scroll horizontally' : '相機模式卡片，可左右滑動'"
      tabindex="0"
      @scroll.passive="updateArrows"
    >
      <article v-for="group in groups" :key="group.zh" class="cam-mode-card">
        <h4>{{ en ? group.en : group.zh }}</h4>
        <table data-static-table>
          <thead>
            <tr>
              <th scope="col">Mode ID</th>
              <th scope="col">{{ en ? 'Submode' : '子模式' }}</th>
              <th scope="col">{{ en ? 'View' : '檢視' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mode in group.modes" :key="mode[0]">
              <td>{{ mode[0] }}</td>
              <td>{{ en ? mode[2] : mode[1] }}</td>
              <td>
                <a
                  :href="`#${sectionId(mode[0])}`"
                  class="cam-mode-jump"
                  :aria-label="`${en ? 'Open mode' : '展開模式'} ${mode[0]} ${en ? mode[2] : mode[1]}`"
                >{{ en ? 'Open' : '展開' }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
    <button
      type="button"
      class="table-scroll-btn left"
      :class="{ visible: canScrollLeft }"
      :aria-label="en ? 'Scroll mode cards left' : '向左滑動模式卡片'"
      :aria-hidden="!canScrollLeft"
      :tabindex="canScrollLeft ? 0 : -1"
      :disabled="!canScrollLeft"
      @click="scrollCards(-1)"
    >
      <span class="arrow-icon" aria-hidden="true"></span>
    </button>
    <button
      type="button"
      class="table-scroll-btn right"
      :class="{ visible: canScrollRight }"
      :aria-label="en ? 'Scroll mode cards right' : '向右滑動模式卡片'"
      :aria-hidden="!canScrollRight"
      :tabindex="canScrollRight ? 0 : -1"
      :disabled="!canScrollRight"
      @click="scrollCards(1)"
    >
      <span class="arrow-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
.cam-mode-scroll-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
  margin: 16px 0 28px;
}

.cam-mode-overview {
  display: grid;
  grid-template-columns: repeat(5, minmax(380px, 1fr));
  align-items: stretch;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.cam-mode-overview::-webkit-scrollbar {
  display: none;
}

.cam-mode-card {
  padding: 16px;
  border: 1px solid #929292;
  border-radius: 10px;
  background: #202020;
}

.cam-mode-card h4 {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.5;
  white-space: nowrap;
}

.cam-mode-card table {
  display: table;
  width: 100%;
  margin: 0;
  table-layout: auto;
  font-size: 13px;
}

.cam-mode-card th,
.cam-mode-card td {
  padding: 8px 6px;
  vertical-align: middle;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: normal;
}

.cam-mode-card th:first-child {
  width: 76px;
}

.cam-mode-card th:last-child {
  width: 72px;
}

.cam-mode-card .cam-mode-jump {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #b0b0b0;
  border-radius: 6px;
  color: inherit;
  line-height: 1.4;
  text-decoration: none;
  white-space: nowrap;
}

.cam-mode-jump:hover {
  background: #383838;
}

.cam-mode-jump:focus-visible,
.cam-mode-overview:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
