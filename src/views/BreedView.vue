<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CatView from '../cat/CatView.vue'
import { breeds } from '../data/breeds'
import type { CatNote, CatPattern } from '../cat/types'
import UiButton from '../ui/UiButton.vue'
import UiChip from '../ui/UiChip.vue'

const coats = [
  { label: 'Cream', value: '#f0d2aa' },
  { label: 'Orange', value: '#e0893f' },
  { label: 'Gray', value: '#b3aec4' },
  { label: 'White', value: '#f7f4ef' },
  { label: 'Black', value: '#322c3a' },
]

const patterns: { label: string; value: CatPattern }[] = [
  { label: 'Solid', value: 'solid' },
  { label: 'Stripes', value: 'stripes' },
  { label: 'Spots', value: 'spots' },
]

const route = useRoute()
const saved = ref(false)
const coat = ref(coats[2]!.value)
const pattern = ref<CatPattern>('solid')

const breed = computed(() => breeds.find((item) => item.id === route.params.id))

const catNote = computed<CatNote>(() => ({
  name: breed.value?.name ?? 'Mallow',
  color: coat.value,
  pattern: pattern.value,
  ears: 'small',
  fluff: 'short',
  move: 'idle',
}))

watch(
  breed,
  (next) => {
    saved.value = false
    if (!next) return
    coat.value = next.coat
    pattern.value = next.pattern
  },
  { immediate: true },
)

function toggleSaved() {
  saved.value = !saved.value
}
</script>

<template>
  <section v-if="breed" class="detail">
    <p class="detail-crumb">
      <RouterLink to="/breeds">Find a Companion</RouterLink>
      <span aria-hidden="true">·</span>
      {{ breed.name }}
    </p>

    <div class="detail-layout">
      <figure class="detail-photo glass">
        <CatView :key="breed.id" class="detail-cat" portrait :note="catNote" />
        <UiChip class="detail-photo-label">{{ breed.name }}</UiChip>
        <button
          type="button"
          class="ui-button ui-button-glass detail-heart"
          :class="{ 'is-saved': saved }"
          :aria-pressed="saved"
          :aria-label="saved ? `Remove ${breed.name} from saved breeds` : `Save ${breed.name}`"
          @click="toggleSaved"
        >
          {{ saved ? '♥' : '♡' }}
        </button>
        <div class="detail-photo-tags">
          <UiChip v-for="tag in breed.tags.slice(0, 2)" :key="tag.label" :tone="tag.tone">
            {{ tag.label }}
          </UiChip>
        </div>
      </figure>

      <div class="detail-copy">
        <UiChip>{{ breed.eyebrow }}</UiChip>
        <h1>{{ breed.name }}</h1>
        <p class="detail-story">{{ breed.story }}</p>

        <div class="detail-controls">
          <p>Coat</p>
          <div>
            <button
              v-for="swatch in coats"
              :key="swatch.value"
              type="button"
              class="coat-choice ui-chip"
              :class="coat === swatch.value ? 'ui-chip-pink' : 'ui-chip-lilac'"
              :aria-pressed="coat === swatch.value"
              @click="coat = swatch.value"
            >
              {{ swatch.label }}
            </button>
          </div>
          <p>Pattern</p>
          <div>
            <button
              v-for="item in patterns"
              :key="item.value"
              type="button"
              class="coat-choice ui-chip"
              :class="pattern === item.value ? 'ui-chip-blue' : 'ui-chip-lilac'"
              :aria-pressed="pattern === item.value"
              @click="pattern = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="detail-stats">
          <article v-for="stat in breed.stats" :key="stat.label" class="detail-stat glass">
            <p>{{ stat.label }}</p>
            <strong>{{ stat.value }}</strong>
            <span v-if="stat.bar" class="detail-bar" aria-hidden="true">
              <i :style="{ width: `${stat.bar}%` }" />
            </span>
            <small>{{ stat.hint }}</small>
          </article>
        </div>

        <p class="detail-note glass">{{ breed.note }}</p>

        <div class="detail-actions">
          <UiButton @click="toggleSaved">
            {{ saved ? 'Saved' : breed.saveLabel }}
          </UiButton>
          <RouterLink to="/breeds" class="ui-button ui-button-glass">{{ breed.asideLabel }}</RouterLink>
        </div>

        <p class="detail-meta">Mallow breed note · {{ breed.line }}</p>
      </div>
    </div>
  </section>

  <section v-else class="detail-missing">
    <h1>This breed is not in the catalog yet.</h1>
    <RouterLink to="/breeds" class="ui-button ui-button-primary">Back to companions</RouterLink>
  </section>
</template>

<style scoped>
.detail-crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.2rem 0 1.2rem;
  color: var(--muted);
  font-size: 0.92rem;
}

.detail-crumb a {
  color: var(--primary-deep);
  font-weight: 700;
  text-decoration: none;
}

.detail-layout {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 1.4rem;
  align-items: start;
}

.detail-photo {
  position: relative;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 2rem;
  background: #e4def6;
}

.detail-cat {
  position: absolute;
  inset: 0;
}

.detail-cat :deep(.cat-scene),
.detail-cat :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.detail-photo-label,
.detail-heart,
.detail-photo-tags {
  z-index: 2;
}

.detail-photo-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.detail-heart {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0;
  font-size: 1.05rem;
}

.detail-heart.is-saved {
  color: #c45b93;
}

.detail-photo-tags {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.detail-copy h1 {
  margin: 0.7rem 0 0;
  font-family: var(--display);
  font-size: 3.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.detail-story,
.detail-note {
  margin: 0.9rem 0 0;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.55;
}

.detail-controls {
  display: grid;
  gap: 0.45rem;
  margin-top: 1rem;
}

.detail-controls p {
  margin: 0.35rem 0 0;
  color: var(--muted);
  font-family: var(--display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-controls div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.coat-choice {
  border: 0;
  cursor: pointer;
}

.detail-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.1rem;
}

.detail-stat {
  padding: 0.9rem 1rem 0.85rem;
  border-radius: 1.3rem;
}

.detail-stat p,
.detail-stat small {
  margin: 0;
  color: var(--muted);
  font-family: var(--display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-stat strong {
  display: block;
  margin: 0.3rem 0 0.15rem;
  font-family: var(--display);
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.detail-stat small {
  display: block;
  margin-top: 0.35rem;
  font-family: var(--body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.detail-bar {
  display: block;
  height: 4px;
  margin-top: 0.45rem;
  border-radius: 999px;
  background: rgba(139, 122, 208, 0.2);
}

.detail-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-deep) 100%);
}

.detail-note {
  padding: 1rem 1.1rem;
  border-radius: 1.4rem;
  color: var(--ink);
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.1rem;
}

.detail-meta {
  margin: 0.9rem 0 0;
  color: var(--muted);
  font-size: 0.82rem;
}

.detail-missing {
  padding: 3rem 0 2rem;
  text-align: center;
}

.detail-missing h1 {
  margin: 0 0 1rem;
  font-family: var(--display);
  font-size: 2rem;
}

@media (max-width: 800px) {
  .detail-layout,
  .detail-stats {
    grid-template-columns: 1fr;
  }

  .detail-copy h1 {
    font-size: 2.4rem;
  }
}
</style>
