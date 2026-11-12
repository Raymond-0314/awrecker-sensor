<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  mode: { type: String, required: true },
  title: { type: String, required: true }
})
const accordion = inject('cam-mode-accordion')
const isOpen = computed(() => accordion.activeMode.value === props.mode)
const sectionId = computed(() => accordion.sectionId(props.mode))
const triggerId = computed(() => `${sectionId.value}-trigger`)
const panelId = computed(() => `${sectionId.value}-panel`)
</script>

<template>
  <section :id="sectionId" class="cam-mode-section">
    <h5 class="cam-mode-heading">
      <button
        :id="triggerId"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="accordion.toggle(mode)"
      >
        <span class="cam-mode-chevron" :class="{ expanded: isOpen }" aria-hidden="true">▸</span>
        <span>Mode ID {{ mode }} · {{ title }}</span>
      </button>
    </h5>
    <div
      v-show="isOpen"
      :id="panelId"
      class="cam-mode-content"
      role="region"
      :aria-labelledby="triggerId"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
.cam-mode-section {
  margin: 16px 0;
  border: 1px solid #929292;
  border-radius: 10px;
  background: #202020;
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 20px);
}

.cam-mode-section .cam-mode-heading {
  margin: 0;
  font-size: 16px;
}

.cam-mode-heading button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 64px;
  padding: 18px 20px;
  color: inherit;
  font: inherit;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  border-radius: 10px;
}

.cam-mode-heading button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.cam-mode-chevron {
  flex: 0 0 auto;
  transition: transform 0.15s;
}

.cam-mode-chevron.expanded {
  transform: rotate(90deg);
}

.cam-mode-content {
  padding: 0 20px 20px;
}

.cam-mode-content :deep(> :first-child) {
  margin-top: 0;
}
</style>
