<script setup lang="ts">
import UiBadge from '../ui/UiBadge.vue'
import UiButton from '../ui/UiButton.vue'
import UiChip from '../ui/UiChip.vue'
</script>

<template>
  <section class="hero" aria-label="Find a companion">
    <img class="hero-photo" src="/sanctuary.jpg" alt="A black cat waving in a lilac living room" />
    <div class="hero-wash"></div>

    <p class="hero-kicker">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M8 13.2s-4.6-2.8-4.6-6A2.7 2.7 0 0 1 8 5.2a2.7 2.7 0 0 1 4.6 2c0 3.2-4.6 6-4.6 6Z"
          fill="currentColor"
        />
      </svg>
      Every friendship begins with understanding
    </p>

    <article class="hero-copy glass">
      <h1>Find a companion who <span>feels like home.</span></h1>
      <p>
        Every cat has a personality of their own. Explore different breeds, discover which traits
        fit your life, and learn how to care for the companion who may soon become part of your
        family.
      </p>
      <div class="hero-actions">
        <UiButton>
          Meet the Breeds
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="4" cy="5" r="1.5" fill="currentColor" />
              <circle cx="8" cy="3.6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="5" r="1.5" fill="currentColor" />
              <ellipse cx="8" cy="10.2" rx="3.2" ry="2.6" fill="currentColor" />
            </svg>
          </template>
        </UiButton>
        <RouterLink to="/breeds" class="ui-button ui-button-glass">Find My Companion</RouterLink>
      </div>
      <div class="hero-chips">
        <UiChip>Unique Personalities</UiChip>
        <UiChip tone="pink">Lifestyle Match</UiChip>
        <UiChip tone="blue">Loving Care</UiChip>
      </div>
    </article>

    <UiBadge class="hero-badge hero-badge-calm">
      <template #mark>♡</template>
      <template #title>Your Feline Match</template>
      Chosen around your lifestyle
    </UiBadge>
    <UiBadge class="hero-badge hero-badge-purr">
      <template #mark>✦</template>
      <template #title>More Than a Breed</template>
      Personality • Energy • Needs
    </UiBadge>
    <UiBadge class="hero-badge hero-badge-velvet">
      <template #mark>+</template>
      <template #title>Care with Confidence</template>
      Health • Grooming • Everyday Life
    </UiBadge>
  </section>
</template>
