<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string
    label?: string
  }>(),
  {
    placeholder: 'Search',
    label: 'Search',
  },
)
</script>

<template>
  <label class="ui-search">
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M10.4 10.4 13.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
    <input type="search" :placeholder="placeholder" :aria-label="label" />
  </label>
</template>
