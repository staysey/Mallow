<script setup lang="ts">
import BrandLockup from "./BrandLockup.vue";
import UiButton from "../ui/UiButton.vue";
import UiHeader from "../ui/UiHeader.vue";
import UiNavLink from "../ui/UiNavLink.vue";
import UiSearch from "../ui/UiSearch.vue";
</script>

<template>
  <UiHeader>
    <template #brand>
      <BrandLockup />
    </template>

    <RouterLink
      to="/breeds"
      class="nav-link"
      exact-active-class="nav-link-active"
      >Find a Companion</RouterLink
    >
    <UiNavLink>Care & Wellbeing</UiNavLink>
    <UiNavLink>About</UiNavLink>

    <template #actions>
      <UiButton tone="solid">Ask Mallow</UiButton>
    </template>
  </UiHeader>
</template>
