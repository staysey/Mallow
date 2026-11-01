<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { mountPeekCat, type PeekHandle } from './mountPeekCat'

const host = ref<HTMLElement | null>(null)
let handle: PeekHandle | null = null

onMounted(() => {
  if (!host.value) return
  document.body.appendChild(host.value)
  handle = mountPeekCat(host.value)
})

onUnmounted(() => {
  handle?.unmount()
  handle = null
  host.value?.remove()
})
</script>

<template>
  <div ref="host" class="peek-cat" aria-hidden="true"></div>
</template>
