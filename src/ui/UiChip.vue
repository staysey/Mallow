<script setup lang="ts">
defineProps<{
  tone?: 'lilac' | 'pink' | 'blue'
}>()
</script>

<template>
  <span
    class="ui-chip"
    :class="{
      'ui-chip-lilac': !tone || tone === 'lilac',
      'ui-chip-pink': tone === 'pink',
      'ui-chip-blue': tone === 'blue',
    }"
  >
    <slot />
  </span>
</template>
