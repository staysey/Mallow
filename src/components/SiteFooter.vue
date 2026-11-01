<script setup lang="ts">
import BrandLockup from './BrandLockup.vue'
import UiFooter from '../ui/UiFooter.vue'
</script>

<template>
  <UiFooter>
    <template #brand>
      <BrandLockup />
    </template>
    <template #note>A guide to breeds and care.</template>
    <RouterLink to="/">Breeds</RouterLink>
    <RouterLink to="/breeds">Companion</RouterLink>
    <button type="button">Care</button>
    <button type="button">Story</button>
    <template #meta>© 2026 Mallow.</template>
  </UiFooter>
</template>
