<template>
  <header class="header">
    <h3 class="header__title">Music App</h3>
    <div class="header__select" @click="showDropdown">
      <span>
        Sort <font-awesome-icon icon="fa fa-solid fa-filter"/>
      </span>
    </div>

    <div class="header__dropdown" v-if="dropdown">
      <div class="header__dropdown-item" @click="sortByArtist">
        <font-awesome-icon icon="fa fa-solid fa-arrow-up-a-z"/>
        <span>by Artist</span>
      </div>
      <div class="header__dropdown-item" @click="sortByYear">
         <font-awesome-icon icon="fa-solid fa-arrow-up-1-9"/>
        <span>by Year</span>
      </div>
      <div class="header__dropdown-item" @click="sortByDate">
        <font-awesome-icon icon="fa-solid fa-arrow-down-short-wide"/>
        <span>by Add Date</span>
      </div>
    </div>
  </header>
</template>

<script setup>

import {ref, defineEmits} from "vue";

const dropdown = ref(false)

const showDropdown = () => {
  dropdown.value = !dropdown.value
}

const emit = defineEmits(['sort-by-artist', 'sort-by-year', 'sort-by-date'])

const sortByArtist = () => {
  emit('sort-by-artist')
  showDropdown()
}

const sortByYear = () => {
  emit('sort-by-year')
  showDropdown()
}

const sortByDate = () => {
  emit('sort-by-date')
  showDropdown()
}

</script>

<style lang="scss" scoped>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0A2228;
  color: #FCFCFC;
  padding: 12px 16px;

  &__select {
    position: relative;
  }

  &__dropdown {
    position: absolute;
    background-color: #51c4d3;
    display: flex;
    flex-direction: column;
    right: 11px;
    top: 40px;
    z-index: 1;
  }

  &__dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;

    span {
      margin-left: 4px;
    }
  }
}

</style>