<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Footer',
  },
)
</script>

<template>
  <footer class="site-footer">
    <slot name="brand" />
    <p class="footer-note">
      <slot name="note" />
    </p>
    <nav class="footer-links" :aria-label="label">
      <slot />
    </nav>
    <p>
      <slot name="meta" />
    </p>
  </footer>
</template>
