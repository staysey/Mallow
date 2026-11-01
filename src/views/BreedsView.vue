<script setup lang="ts">
import { breeds } from '../data/breeds'
import UiChip from '../ui/UiChip.vue'

const portrait = '/breed-cat.png'
</script>

<template>
  <section class="catalog">
    <header class="catalog-intro">
      <p class="catalog-kicker">Mallow living compendium</p>
      <h1>Quiet companions & serene souls</h1>
      <p>A short catalog of breeds. One cat, a different nature on every card.</p>
      <div class="catalog-filters">
        <UiChip>Catalog</UiChip>
        <UiChip tone="pink">Calm</UiChip>
        <UiChip tone="blue">Vocal</UiChip>
        <UiChip>Fluffy</UiChip>
      </div>
    </header>

    <article
      v-for="(breed, index) in breeds"
      :key="breed.id"
      class="breed-card glass"
      :class="{ 'is-flipped': index % 2 === 1 }"
    >
      <figure class="breed-photo">
        <img :src="portrait" :alt="`${breed.name}, shown as the Mallow cat`" />
        <UiChip class="breed-photo-label">{{ breed.name }}</UiChip>
      </figure>

      <div class="breed-copy">
        <p class="breed-eyebrow">{{ breed.eyebrow }}</p>
        <h2>{{ breed.name }} — {{ breed.line }}</h2>
        <p>{{ breed.summary }}</p>
        <div class="breed-tags">
          <UiChip v-for="tag in breed.tags" :key="tag.label" :tone="tag.tone">
            {{ tag.label }}
          </UiChip>
        </div>
        <RouterLink :to="`/breeds/${breed.id}`" class="ui-button ui-button-primary">
          {{ breed.action }}
        </RouterLink>
      </div>
    </article>

    <p class="catalog-quote">“Gentle presence, quiet purrs, peace at home.”</p>
  </section>
</template>

<style scoped>
.catalog-intro {
  margin: 0.5rem auto 1.6rem;
  text-align: center;
}

.catalog-kicker {
  margin: 0;
  color: var(--primary-deep);
  font-family: var(--display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.catalog-intro h1 {
  margin: 0.45rem 0 0;
  font-family: var(--display);
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.catalog-intro > p {
  margin: 0.7rem auto 0;
  max-width: 42rem;
  color: var(--muted);
}

.catalog-filters,
.breed-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.catalog-filters {
  justify-content: center;
  margin-top: 1rem;
}

.breed-card {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 1.4rem;
  align-items: center;
  margin-top: 1.1rem;
  padding: 0.85rem;
  border-radius: 2rem;
}

.breed-card.is-flipped .breed-photo {
  order: 2;
}

.breed-photo {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 1.5rem;
  background: #e4def6;
}

.breed-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  height: auto;
  object-fit: cover;
  object-position: center;
}

.breed-photo-label {
  position: absolute;
  left: 0.8rem;
  bottom: 0.8rem;
}

.breed-copy {
  padding: 0.6rem 0.8rem 0.6rem 0.2rem;
}

.breed-eyebrow {
  margin: 0;
  color: var(--primary-deep);
  font-family: var(--display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.breed-copy h2 {
  margin: 0.35rem 0 0;
  font-family: var(--display);
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.breed-copy > p {
  margin: 0.65rem 0 0;
  color: var(--muted);
  line-height: 1.5;
}

.breed-tags {
  margin: 0.9rem 0 1rem;
}

.catalog-quote {
  margin: 2.4rem auto 0.4rem;
  max-width: 28rem;
  text-align: center;
  font-family: var(--display);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

@media (max-width: 800px) {
  .catalog-intro h1 {
    font-size: 2rem;
  }

  .breed-card,
  .breed-card.is-flipped {
    grid-template-columns: 1fr;
  }

  .breed-card.is-flipped .breed-photo {
    order: 0;
  }
}
</style>
