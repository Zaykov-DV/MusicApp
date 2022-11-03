<template>
  <div class="search">
    <BaseInput class="search__input" placeholder="Search" v-model="search" withIcon="true">
      <slot>
        <i class="fa fa-solid fa-search"></i>
      </slot>
    </BaseInput>
  </div>
  <ul class="vinyls">
    <VinylItem v-for="vinyl in filteredList" :key="vinyl.id" :vinyl="vinyl"/>
    <Loading v-if="loading"/>
  </ul>
</template>

<script setup>
import VinylItem from "@/components/VinylItem";
import {ref, onMounted, computed} from "vue";
import Loading from "@/components/UI/Loading";
import db from "@/firebase";
import BaseInput from "@/components/UI/BaseInput";

const vinyls = ref([])
const loading = ref(false)

const search = ref('')

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
        vinyls.value = vinyls.value.filter(city => city.id !== doc.doc.id)
      }
    })
  })
}

onMounted(() => {
  getMyVinyls()
})

</script>

<style lang="scss">

.search {
  background-color: #112A30;
  color: #FCFCFC;
  padding: 12px 16px;
}

</style>