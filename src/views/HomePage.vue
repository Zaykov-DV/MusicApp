<template>
  <Loading v-if="loading"/>
  <div class="search">
    <BaseInput class="search__input" placeholder="Search" v-model="search" withIcon="true">
      <slot>
        <i class="fa fa-solid fa-search"></i>
      </slot>
    </BaseInput>
  </div>
  <ul class="vinyls">
    <VinylItem v-for="vinyl in filteredList" :key="vinyl.id" :vinyl="vinyl"/>
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #132C33 0%, rgba(56, 134, 156, 0) 100%), #132C33;
}

header {
  display: flex;
  align-items: center;
  background-color: #0A2228;
  color: #FCFCFC;
  padding: 12px 16px;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__container {
    height: 100%;
  }
}

.search {
  background-color: #112A30;
  color: #FCFCFC;
  padding: 12px 16px;
}

.vinyls {
  height: 100%;
}

.vinyl {
  &__item {
    display: flex;
    padding: 12px 16px;
    color: #FCFCFC;
    height: 70px;
    background: #112A30;
    box-shadow: 0px 0px 2px #51C4D3;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  }

  &__img {
    max-height: 50px;
    max-width: 50px;
  }

  &__album {
    font-size: 16px;
  }

  &__artist {
    font-size: 14px;
  }

  &__year {
    font-size: 12px;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: #FCFCFC;
  background: #132C33;
  box-shadow: 0px 0px 2px #51C4D3;
  height: 44px;

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
}
</style>