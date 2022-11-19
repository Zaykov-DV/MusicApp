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
      <VinylItem v-for="vinyl in filteredList" :key="vinyl.id" :vinyl="vinyl" :edit="edit"/>
      <Loading class="home-page__loading" v-if="loading"/>
    </ul>
  </div>
</template>

<script setup>
import Loading from "@/components/UI/Loading";
import VinylItem from "@/components/VinylItem";
import BaseInput from "@/components/UI/BaseInput";

import {ref, onMounted, computed, defineProps} from "vue";
import db from "@/firebase";

defineProps({
  edit: Boolean,
})

const vinyls = ref([])
const loading = ref(false)
const search = ref('')

onMounted(() => {
  getMyVinyls()
})

const filteredList = computed(() => {
  return vinyls.value.filter(vinyl => {
    return vinyl.artist.toLowerCase().includes(search.value.toLowerCase())
  })
})

const getMyVinyls = () => {
  let firebaseDB = db.collection('vinyls')

  firebaseDB.onSnapshot(snap => {
    if (snap.docs.length === 0) loading.value = false
    snap.docChanges().forEach(async (doc) => {
      if (doc.type === 'added') {
        try {
          loading.value = true
          await firebaseDB.doc(doc.doc.id).update({
            id: doc.doc.id
          })
              .then(() => {
                vinyls.value.push(doc.doc.data())
              })
              .then(() => {
                loading.value = false
              })
        } catch (error) {
          console.log(error)
        }
      } else if (doc.type === 'removed') {
        vinyls.value = vinyls.value.filter(vinyls => vinyls.id !== doc.doc.id)
      }
    })
  })
}
</script>


<style lang="scss">

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