<script setup lang="ts">
defineProps<{
  tone?: 'primary' | 'glass' | 'solid'
}>()
</script>

<template>
  <button
    type="button"
    class="ui-button"
    :class="{
      'ui-button-primary': !tone || tone === 'primary',
      'ui-button-glass': tone === 'glass',
      'ui-button-solid': tone === 'solid',
    }"
  >
    <slot />
    <slot name="icon" />
  </button>
</template>
