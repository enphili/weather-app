<template>
  <button
    :class="['footer-nav__button', {'button--active': isActive}]"
  >
    <slot></slot>
    {{ title }}
  </button>
</template>

<script setup lang="ts">

defineProps<{
  title: string,
  isActive?: boolean,
}>()

</script>

<style lang="sass">
.footer-nav
  &__button
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    padding: 9px 0
    border: none
    font-size: 12px
    color: var(--fot-nav-btn-color)
    background-color: var(--fot-nav-btn-bgc)
    overflow: hidden
    cursor: pointer
    transition: var(--transition)
    & svg
      fill: var(--fot-nav-btn-color)
      transition: var(--transition)
.button--active
  color: var(--accent-color)
  transition: var(--transition)
  &  svg
    fill: var(--accent-color)
    transition: var(--transition)
</style>