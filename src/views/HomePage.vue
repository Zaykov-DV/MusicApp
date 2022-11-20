<template>
  <div class="home-page">
    <div class="home-page__search">
      <BaseInput :disabled="loading" placeholder="Search artist" v-model="search" withIcon>
        <slot>
          <i class="fa fa-solid fa-search"></i>
        </slot>
      </BaseInput>



    </div>
    <ul class="home-page__vinyls">
      <TransitionGroup name="list">
        <VinylItem v-for="vinyl in filteredList" :key="vinyl.id" :vinyl="vinyl" :edit="edit"/>
      </TransitionGroup>
      <Loading class="home-page__loading" v-if="loading"/>
    </ul>
  </div>
</template>

<script setup>
import Loading from "@/components/UI/Loading";
import VinylItem from "@/components/VinylItem";
import BaseInput from "@/components/UI/BaseInput";

import {ref, computed, defineProps} from "vue";

const props = defineProps({
  edit: Boolean,
  vinyls: Object,
  loading: Boolean
})

const search = ref('')

const filteredList = computed(() => {
  return props.vinyls.filter(vinyl => {
    return vinyl.artist.toLowerCase().includes(search.value.toLowerCase())
  })
})
</script>


<style lang="scss">

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.home-page {
  height: 100%;

  &__vinyls {
    position: relative;
    height: 80%;
    flex: 1;
  }

  &__search {
    background-color: #112A30;
    color: #FCFCFC;
    padding: 12px 16px;
  }
}
</style>