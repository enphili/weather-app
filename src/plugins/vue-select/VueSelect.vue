<template>
  <div id="select" :class="['select', {'open': isOpen}]" @click="clickHandler">
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">{{ currentValue }}</span>
      <svg v-if="showArrowDown" :class="[isOpen ? 'arrow-svg--up' : 'arrow-svg--down']" data-type="arrow" fill="#000000" height="64px" width="64px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g> <path data-type="arrow" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/></g>
      </svg>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        <li
          v-for="(obj, idx) in data"
          :key="obj"
          :class="['select__item', {selected: selectedId === idx}]"
          data-type="item"
          :data-id="idx"
          @click="selectItem(obj, idx)"
        >
          {{ obj }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import {useLocationsStore} from '../../store/locations'
import {beyondGuard} from '../../utils/preventArrayOverflow'

type TDate =  (number | string)[]

const props = defineProps({
  placeholder: {
    type: [String, Number],
    required: false,
    default: 'Выбрать значение'
  },
  showArrowDown: {
    type: Boolean,
    required: false,
    default: true
  },
  isPlaceholderNeed: {
    type: Boolean,
    required: false,
    default: true
  },
  data: {
    type: Array as PropType<TDate>,
    required: true,
  },
  selectedItem: {
    type: Number,
    required: false,
    default: 0
  }
})


const store = useLocationsStore()
const isOpen = ref<boolean>(false)
const selectedId = ref(props.selectedItem)
const currentValue = ref(props.isPlaceholderNeed ? props.placeholder : beyondGuard(props.data, props.selectedItem))

const selectItem = (value: string | number, idx: number) => {
  selectedId.value = idx
  currentValue.value = value
  isOpen.value = false
  if (typeof value === 'string') {
    const number = Number(value)
    if (isNaN(number)) {
      throw new Error(`value ${value} cannot be converted to a number`)
    }
    store.changeSelectValue(idx, number)
    store.reduceLocationsLength(number)
  } else {
    store.changeSelectValue(idx, value)
    store.reduceLocationsLength(value)
  }
}

const clickHandler = (e: MouseEvent) => {
  if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
    const {type} = e.target.dataset
    if (type === 'input' || type === 'arrow' || type === 'value') {
      isOpen.value = !isOpen.value
    } else if (type === 'backdrop') {
      isOpen.value = false
    }
  }
}

</script>

<style scoped lang="sass">
$height: 33px
.select
  width: $height
  position: relative
  user-select: none
  &.open
    .select__dropdown
      display: block
    .select__input
      border-top: none
    .select__backdrop
      display: block
      z-index: 91
  &__input
    border: 3px solid rgba(34, 31, 31, 0.26)
    border-radius: 5px
    height: $height
    display: flex
    align-items: center
    justify-content: center
    padding: 0 6px
    cursor: pointer
  &__dropdown
    position: absolute
    bottom: $height
    left: 0
    right: 0
    display: none
    max-height: calc($height * 5)
    overflow-y: auto
    border: 3px solid rgba(34, 31, 31, 0.26)
    border-radius: 5px
    background-color: #fff
    box-shadow: 2px -3px 5px rgba(0, 0, 0, 0.3)
    z-index: 99
  &__list
    padding: 0
    margin: 0
    list-style: none
  &__backdrop
    position: fixed
    display: none
    z-index: -1
    inset: 0
    background: transparent
  &__item
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 6px
    border-bottom: 1px solid rgba(34, 31, 31, 0.26)
    &.selected
      background-color: rgba(255, 87, 34, 0.5)
    &:hover
      background-color: #eee
      cursor: pointer
      transition: 0.15s background-color ease-in
.arrow-svg--down, .arrow-svg--up
  width: 14px
  height: 16px
  margin-left: 10px
.arrow-svg--up
  transform: rotate(180deg)
@media only screen and (min-width: 768px)
  .select
    width: calc($height * 2)
</style>