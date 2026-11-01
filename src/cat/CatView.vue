<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { mountCat, type CatHandle } from './mountCat'
import type { CatNote } from './types'

const props = defineProps<{
  note: CatNote
}>()

const host = ref<HTMLElement | null>(null)
let handle: CatHandle | null = null

onMounted(() => {
  if (!host.value) return
  handle = mountCat(host.value, props.note)
})

watch(
  () => props.note,
  (note) => handle?.update(note),
  { deep: true },
)

onUnmounted(() => {
  handle?.unmount()
  handle = null
})
</script>

<template>
  <div ref="host" class="cat-host"></div>
</template>
