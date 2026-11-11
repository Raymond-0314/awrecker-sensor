<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'

const props = defineProps<{ product: 'S8' | 'S16'; alt: string }>()
const route = useRoute()
const isEv3 = computed(() => /\/products\/(?:S8|S16)\/ev3-[^/]+(?:\.html)?\/?$/.test(route.path))
const image = computed(() => {
  const controller = isEv3.value
    ? 'ev3'
    : 'spike'
  return withBase(`/images/products/${props.product}/${props.product}-${controller}.webp`)
})
</script>

<template>
  <img :src="image" :alt="alt" :class="isEv3 ? `ev3-image-${product}` : undefined">
</template>

<style scoped>
.ev3-image-S8,
.ev3-image-S16 {
  display: block;
  margin-inline: auto;
}

.ev3-image-S8 {
  width: calc(100% * 2 / 3 * 0.8) !important;
}

.ev3-image-S16 {
  width: 80% !important;
}
</style>
