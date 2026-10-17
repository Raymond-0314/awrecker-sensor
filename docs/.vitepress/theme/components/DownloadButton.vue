<script setup>
import { withBase } from 'vitepress'

defineProps({
  href: { type: String, required: true },
  download: { type: String, required: true },
  label: { type: String, default: '範例程式下載' }
})
</script>

<template>
  <a
    :href="withBase(href)"
    :download="download"
    class="zip-download-btn">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d="M12 3v12m-5-5 5 5 5-5"></path>
      <path d="M5 16v5h14v-5"></path>
    </svg>
    {{ label }}
  </a>
</template>