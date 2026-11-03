<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getBreeds } from "../api/getBreeds";
import CatView from "../cat/CatView.vue";
import type { Breed } from "../data/breeds";
import type { CatNote } from "../cat/types";
import UiButton from "../ui/UiButton.vue";
import UiChip from "../ui/UiChip.vue";

const route = useRoute();
const saved = ref(false);
const breeds = ref<Breed[]>([]);
const loading = ref(true);
const failed = ref(false);

const breed = computed(() =>
  breeds.value.find((item) => item.id === route.params.id),
);

const catNote = computed<CatNote>(() => ({
  name: breed.value?.name ?? "Mallow",
  color: breed.value?.coat ?? "#b3aec4",
  pattern: breed.value?.pattern ?? "solid",
  ears: "small",
  fluff: "short",
  move: "idle",
}));

watch(
  () => route.params.id,
  () => {
    saved.value = false;
  },
);

onMounted(async () => {
  try {
    breeds.value = await getBreeds();
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
});

function toggleSaved() {
  saved.value = !saved.value;
}
</script>

<template>
  <section v-if="loading" class="detail-missing">
    <h1>Opening this breed…</h1>
  </section>

  <section v-else-if="breed" class="detail">
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
          :aria-label="
            saved
              ? `Remove ${breed.name} from saved breeds`
              : `Save ${breed.name}`
          "
          @click="toggleSaved"
        >
          {{ saved ? "♥" : "♡" }}
        </button>
        <div class="detail-photo-tags">
          <UiChip
            v-for="tag in breed.tags.slice(0, 2)"
            :key="tag.label"
            :tone="tag.tone"
          >
            {{ tag.label }}
          </UiChip>
        </div>
      </figure>

      <div class="detail-copy">
        <h1>{{ breed.name }}</h1>
        <p class="detail-story">{{ breed.story }}</p>

        <section class="detail-section">
          <h2>Breed description</h2>
          <p>{{ breed.description }}</p>
        </section>

        <section class="detail-section">
          <h2>Characteristics & temperament</h2>
          <p>{{ breed.temperament }}</p>
        </section>

        <p class="detail-note glass">{{ breed.note }}</p>

        <div class="detail-actions">
          <UiButton @click="toggleSaved">
            {{ saved ? "Saved" : breed.saveLabel }}
          </UiButton>
          <RouterLink to="/breeds" class="ui-button ui-button-glass">{{
            breed.asideLabel
          }}</RouterLink>
        </div>

        <p class="detail-meta">Mallow breed note · {{ breed.line }}</p>
      </div>
    </div>
  </section>

  <section v-else class="detail-missing">
    <h1>
      {{
        failed
          ? "The breed guide could not be opened."
          : "This breed is not in the catalog yet."
      }}
    </h1>
    <RouterLink to="/breeds" class="ui-button ui-button-primary"
      >Back to companions</RouterLink
    >
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
.detail-note,
.detail-section p {
  margin: 0.9rem 0 0;
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.55;
}

.detail-section {
  margin-top: 1.15rem;
}

.detail-section h2 {
  margin: 0;
  color: var(--primary-deep);
  font-family: var(--display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-section p {
  margin: 0.45rem 0 0;
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
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-copy h1 {
    font-size: 2.4rem;
  }
}
</style>
