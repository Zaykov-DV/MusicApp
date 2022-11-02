<template>
  <div class="vinyl__item-add">
    <div class="vinyl__img-wrapper">
      <img class="vinyl__img-cover" src="../assets/pnge1gg.png" alt="cover">
      <img class="vinyl__img" v-if="currentVinyl.imageUrl" :src="currentVinyl.imageUrl" alt="img">
      <div v-else class="vinyl__img vinyl__img_empty"></div>
    </div>
    <div class="vinyl__info">
      <div class="vinyl__info-item">
        <h4 class="vinyl__info-title">Album:</h4>
        <p class="vinyl__info-descr">{{ currentVinyl.album }}</p>
      </div>
      <div class="vinyl__info-item">
        <h4 class="vinyl__info-title">Artist:</h4>
        <p class="vinyl__info-descr">{{ currentVinyl.artist }}</p>
      </div>
      <div class="vinyl__info-item">
        <h4 class="vinyl__info-title">Year:</h4>
        <span class="vinyl__info-descr">{{ currentVinyl.year }}</span>
      </div>
      <div class="vinyl__info-item">
        <h4 class="vinyl__info-title">Playlist:</h4>
        <span class="vinyl__info-descr">{{ currentVinyl.playlist }}</span>
      </div>
      <div class="vinyl__info-item">
        <h4 class="vinyl__info-title">Rating:</h4>
        <StarRating @click="updateRating(dbStars)" :dbStars="currentVinyl.rating" v-on:changeRating="changeRating" hasCounter="false"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits} from "vue";
import db from '../firebase'
import {useRoute} from "vue-router";
import StarRating from "@/components/UI/StarRating"

const route = useRoute()

const dbStars = ref(0)

const changeRating = (value) => {
  dbStars.value = value;
}

const emit = defineEmits(['getVinyl'])

defineProps({
  currentVinyl: Object
})

const updateRating = async (stars) => {
  const dataBase = await db.collection("vinyls").doc(route.params.id);
  await dataBase.update({
    rating: stars,
  }).then(() => {
    emit('getVinyl')
  })
}


</script>

<style scoped lang="scss">
.vinyl {
  position: relative;

  &__info {
    width: 100%;
    padding: 0 20px;
  }

  &__img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img-cover {
    max-height: 256px;
    max-width: 128px;
    width: 100%;
    height: 100%;
  }

  &__img {
    max-height: 235px;
    max-width: 235px;
    box-shadow: 0 0 0 0 white;
    border: 1px solid white;

    &_empty {
      background-color: #fff;
      content: "";
      width: 235px;
      height: 235px;
    }
  }

  &__item-add {
    box-shadow: none;
    padding: 0;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__info-item {
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    &:last-child {
      border-bottom: none;
    }
  }

  &__info-title {
    margin-bottom: 2px;
  }

  &__info-descr {
    font-size: 16px;
    white-space: pre-line;
  }
}
</style>