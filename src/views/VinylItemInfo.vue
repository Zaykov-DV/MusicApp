<template>
  <main class="main">
    <div class="main__container">
      <Additional v-on:getVinyl="getVinyl" :currentVinyl="currentVinyl" />
    </div>
  </main>
  <Loading v-if="loading" />
</template>

<script setup>

import db from '../firebase'
import {reactive, ref, onMounted} from "vue";
import Loading from "@/components/UI/Loading";
import { useRoute } from "vue-router";
import Additional from "@/components/Additional";

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