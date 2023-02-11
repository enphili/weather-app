<template>
  <button
    :class="['footer-nav__button', {'button--active': isActive}]"
  >
    <slot></slot>
    {{ title }}
  </button>
</template>

<script setup lang="ts">

const props = defineProps<{
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
    color: rgba(0,0,0,0.75)
    background-color: #f1f5f6
    overflow: hidden
    cursor: pointer
    & svg
      fill: rgba(0,0,0,0.75)
.button--active
  color: #FF5722
  &  svg
    fill: #FF5722
</style>