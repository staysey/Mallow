<script setup lang="ts">
import UiButton from '../ui/UiButton.vue'
</script>

<template>
  <section class="match glass">
    <div class="match-heart" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 16 16">
        <path
          d="M8 13.2s-4.6-2.8-4.6-6A2.7 2.7 0 0 1 8 5.2a2.7 2.7 0 0 1 4.6 2c0 3.2-4.6 6-4.6 6Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <h2>Ready to find your feline companion?</h2>
    <p>
      Take our 2-minute matching quiz and discover cat breeds whose personality, energy, and care
      needs fit naturally into your life.
    </p>
    <div class="hero-actions">
      <UiButton>Start the Match Quiz</UiButton>
      <RouterLink to="/" class="ui-button ui-button-glass">Explore All Breeds</RouterLink>
    </div>
  </section>
</template>
