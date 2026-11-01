<script setup lang="ts">
import UiBadge from '../ui/UiBadge.vue'
import UiButton from '../ui/UiButton.vue'
import UiChip from '../ui/UiChip.vue'
import UiSearch from '../ui/UiSearch.vue'
</script>

<template>
  <section class="kit">
    <h1>UI Kit</h1>
    <p>Shared components with sample labels.</p>

    <div class="kit-block">
      <h2>Buttons</h2>
      <div class="kit-row">
        <UiButton>Primary</UiButton>
        <UiButton tone="glass">Glass</UiButton>
        <UiButton tone="solid">Solid</UiButton>
      </div>
    </div>

    <div class="kit-block">
      <h2>Chips</h2>
      <div class="kit-row">
        <UiChip>Label</UiChip>
        <UiChip tone="pink">Label</UiChip>
        <UiChip tone="blue">Label</UiChip>
      </div>
    </div>

    <div class="kit-block">
      <h2>Search</h2>
      <UiSearch />
    </div>

    <div class="kit-block">
      <h2>Badges</h2>
      <div class="kit-row">
        <UiBadge>
          <template #mark>A</template>
          <template #title>Title</template>
          Supporting text
        </UiBadge>
        <UiBadge>
          <template #mark>B</template>
          <template #title>Title</template>
          Supporting text
        </UiBadge>
      </div>
    </div>
  </section>
</template>
