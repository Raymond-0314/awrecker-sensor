<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const isEnglish = computed(() =>
  lang.value.startsWith('en')
)

const text = computed(() =>
  isEnglish.value
    ? {
        title: '8-Channel Binary Converter',
        decimal: 'Decimal Value (0 ~ 255)',
        clear: 'Clear',
        allOn: 'All On',
        binary: 'Binary',
        detected: '● Line detected',
        notDetected: '○ Not detected',
        summary: 'Line detected:',
        none: 'None',
        separator: ', '
      }
    : {
        title: '8 通道 bin 轉換器',
        decimal: '十進位數值 (0 ~ 255)',
        clear: '清除',
        allOn: '全開',
        binary: '二進位',
        detected: '● 偵測到線',
        notDetected: '○ 未偵測',
        summary: '偵測到線：',
        none: '無',
        separator: '、'
      }
)

const bits = 8
const maxValue = 255

const value = ref(0)
const inputValue = ref('0')

const binary = computed(() =>
  value.value.toString(2).padStart(bits, '0')
)

const detected = computed(() =>
  Array.from({ length: bits }, (_, i) => i + 1)
    .filter(ch => (value.value & (1 << (ch - 1))) !== 0)
)

function updateValue(event: Event) {
  const raw = (event.target as HTMLInputElement).value
  inputValue.value = raw

  if (raw.trim() === '') return

  const n = Number(raw)

  if (Number.isInteger(n) && n >= 0 && n <= maxValue) {
    value.value = n
  }
}

function setValue(n: number) {
  value.value = n
  inputValue.value = String(n)
}

function toggle(index: number) {
  setValue(value.value ^ (1 << index))
}
</script>

<template>
  <div class="sensor-tool">
    <h3>{{ text.title }}</h3>

    <label for="sensor8-input">
      {{ text.decimal }}
    </label>

    <div class="sensor-controls">
      <input
        id="sensor8-input"
        type="number"
        min="0"
        max="255"
        step="1"
        :value="inputValue"
        @input="updateValue"
      />

      <button type="button" @click="setValue(0)">
        {{ text.clear }}
      </button>

      <button type="button" @click="setValue(255)">
        {{ text.allOn }}
      </button>
    </div>

    <div class="sensor-result">
      <span>{{ text.binary }}</span>
      <code>{{ binary }}</code>
    </div>

    <!-- 水平捲動容器 -->
    <div class="sensor-scroll">
      <div class="sensor-grid">
        <button
          v-for="i in bits"
          :key="i"
          type="button"
          class="sensor-channel"
          :class="{ active: detected.includes(i) }"
          :aria-pressed="detected.includes(i)"
          @click="toggle(i - 1)"
        >
          <strong>CH{{ i }}</strong>
          <span>
            {{ detected.includes(i) ? text.detected : text.notDetected }}
          </span>
        </button>
      </div>
    </div>

    <p class="sensor-summary">
      {{ text.summary }}
      {{
        detected.length
          ? detected.map(i => `CH${i}`).join(text.separator)
          : text.none
      }}
    </p>
  </div>
</template>

<style scoped>
.sensor-tool {
  width: 100%;
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.sensor-tool h3 {
  margin: 0 0 8px;
}

.sensor-hint {
  margin: 8px 0 20px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.sensor-controls {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.sensor-controls input {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.sensor-controls button {
  flex-shrink: 0;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.sensor-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
}

.sensor-result code {
  font-size: 16px;
  letter-spacing: 1px;
  overflow-wrap: anywhere;
}

/* 外層負責水平捲動 */
.sensor-scroll {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 10px;
  scrollbar-width: thin;
}

/* 8 路固定一列 */
.sensor-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  min-width: 720px;
}

.sensor-channel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  padding: 12px 4px;
  white-space: nowrap;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.sensor-channel strong {
  font-size: 14px;
}

.sensor-channel span {
  font-size: 12px;
}

.sensor-channel.active {
  background: var(--vp-c-green-soft);
  border-color: var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.sensor-summary {
  margin: 16px 0 0;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.sensor-scroll::-webkit-scrollbar {
  height: 6px;
}

.sensor-scroll::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 10px;
}

@media (max-width: 480px) {
  .sensor-tool {
    padding: 14px;
  }

  .sensor-controls button {
    padding: 8px 10px;
  }
}
</style>