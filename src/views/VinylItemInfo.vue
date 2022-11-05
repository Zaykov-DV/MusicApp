<template>
  <div class="vinyl-item-info">
    <div class="vinyl-item-info__img-wrapper">
      <img class="vinyl-item-info__img-cover" src="../assets/pnge1gg.png" alt="cover">
      <img class="vinyl-item-info__img" v-if="currentVinyl.imageUrl" :src="currentVinyl.imageUrl" alt="img">
      <div v-else class="vinyl-item-info__img vinyl-item-info__img_empty"></div>
    </div>
    <div class="vinyl-item-info__info">
      <div class="vinyl-item-info__info-item">
        <h4 class="vinyl-item-info__info-title">Album:</h4>
        <p class="vinyl-item-info__info-descr">{{ currentVinyl.album }}</p>
      </div>
      <div class="vinyl-item-info__info-item">
        <h4 class="vinyl-item-info__info-title">Artist:</h4>
        <p class="vinyl-item-info__info-descr">{{ currentVinyl.artist }}</p>
      </div>
      <div class="vinyl-item-info__info-item">
        <h4 class="vinyl-item-info__info-title">Year:</h4>
        <span class="vinyl-item-info__info-descr">{{ currentVinyl.year }}</span>
      </div>
      <div class="vinyl-item-info__info-item">
        <h4 class="vinyl-item-info__info-title">Playlist:</h4>
        <span class="vinyl-item-info__info-descr">{{ currentVinyl.playlist }}</span>
      </div>
      <div class="vinyl-item-info__info-item">
        <h4 class="vinyl-item-info__info-title">Rating:</h4>
        <StarRating @click="updateRating(dbStars)" :dbStars="currentVinyl.rating" v-on:changeRating="changeRating" hasCounter="false"/>
      </div>
    </div>
  </div>
  <Loading v-if="loading" />
</template>

<script setup>
import db from '../firebase'
import {reactive, ref, onMounted, defineEmits, defineProps} from "vue";
import { useRoute } from "vue-router";

import StarRating from "@/components/UI/StarRating"
import Loading from "@/components/UI/Loading";

const route = useRoute()

const currentVinyl = reactive({
  imageUrl: '',
  album: '',
  artist: '',
  year: '',
  playlist: '',
  rating: null
})

const loading = ref(false)
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

onMounted(() => {
  getVinyl()
})

const getVinyl = () => {
  loading.value = true
  db.collection('vinyls')
      .where('id', '==', `${route.params.id}`)
      .get()
      .then((docs) => {
        docs.forEach(doc => {
          currentVinyl.imageUrl = doc.data().imageUrl
          currentVinyl.album = doc.data().album
          currentVinyl.artist = doc.data().artist
          currentVinyl.year = doc.data().year
          currentVinyl.playlist = doc.data().playlist
          currentVinyl.rating = doc.data().rating
        })
      })
      .then(() => {
        loading.value = false
      })
}
</script>

<style scoped lang="scss">

.vinyl-item-info {
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

  &__info-item {
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    min-height: 55px;
    color: #fff;

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