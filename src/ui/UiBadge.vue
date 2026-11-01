<template>
  <div class="ui-badge">
    <div class="badge-mark">
      <slot name="mark" />
    </div>
    <div>
      <strong><slot name="title" /></strong>
      <span><slot /></span>
    </div>
  </div>
</template>
