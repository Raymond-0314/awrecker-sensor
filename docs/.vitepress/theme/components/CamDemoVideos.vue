<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()
const videoIds = ['TNSWyYQlSrc', 'j3OTRWreNw4', 'tA7D4E5uIAo']
</script>

<template>
  <div class="cam-demo-videos">
    <iframe
      v-for="(id, index) in videoIds"
      :key="id"
      :src="`https://www.youtube.com/embed/${id}`"
      :title="`【Lego】 Lau Xiao ${lang.startsWith('en') ? 'demonstration' : '示範影片'} ${index + 1}`"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.cam-demo-videos {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 16px;
  overflow-x: auto;
  margin: 16px 0 24px;
}

.cam-demo-videos iframe {
  display: block;
  width: 100%;
  aspect-ratio: 9 / 16;
  border: 0;
  border-radius: 12px;
}
</style>
