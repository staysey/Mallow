<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Primary',
  },
)
</script>

<template>
  <header class="site-header glass">
    <slot name="brand" />
    <slot name="search" />
    <nav class="site-nav" :aria-label="label">
      <slot />
    </nav>
    <slot name="actions" />
  </header>
</template>
