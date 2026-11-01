<script setup lang="ts">
import { ref } from 'vue'
import CatView from './cat/CatView.vue'
import type { CatNote } from './cat/types'

const note = ref<CatNote>({
  name: 'Cat',
  color: '#1c1c1c',
  ears: 'big',
  fluff: 'fluffy',
  move: 'idle',
})
</script>

<template>
  <main class="page">
    <section class="stage">
      <CatView :note="note" />
    </section>

    <aside class="panel">
      <h1>meow</h1>
      <p class="hint">The site is Vue. The cat in the window on the left is drawn with React.</p>

      <label>
        Name
        <input v-model="note.name" type="text" />
      </label>

      <label>
        Color
        <input v-model="note.color" type="color" />
      </label>

      <div class="row">
        <button type="button" @click="note.ears = note.ears === 'big' ? 'small' : 'big'">
          Ears
        </button>
        <button type="button" @click="note.fluff = note.fluff === 'fluffy' ? 'short' : 'fluffy'">
          Fluff
        </button>
      </div>
    </aside>
  </main>
</template>
