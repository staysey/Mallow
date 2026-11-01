<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button type="button" class="nav-link" :class="{ 'nav-link-active': active }">
    <slot />
  </button>
</template>
