<template>
  <div class="app">
    <Header v-if="!welcomePage && !authPage" v-on:sort-by-artist="sortByArtist" v-on:sort-by-year="sortByYear"
            v-on:sort-by-date="sortByDate"/>
    <main class="main">
      <div class="main__container">
        <router-view :edit="edit" :vinyls="vinyls" :loading="loading" v-slot="{ Component }">
          <Transition name="slide" mode="out-in">
            <Component :is="Component"/>
          </Transition>
        </router-view>
      </div>
    </main>
    <Footer v-if="!authPage && !welcomePage" v-on:edit-vinyls="toggleEdit"/>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import db from "@/firebase";

const route = useRoute()
const authPage = ref(false)
const welcomePage = ref(false)
const edit = ref(false)
const loading = ref(false)
const vinyls = ref([])

const toggleEdit = () => {
  edit.value = !edit.value
}

onMounted(() => {
  getMyVinyls()
})

const getMyVinyls = () => {
  loading.value = true
  let firebaseDB = db.collection('vinyls')

  firebaseDB.onSnapshot(snap => {
    if (snap.docs.length === 0) loading.value = false
    snap.docChanges().forEach(async (doc) => {
      if (doc.type === 'added') {
        try {
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

const sortByArtist = () => {
  vinyls.value.sort((a, b) => {
    if (a.artist.toLowerCase() < b.artist.toLowerCase()) {
      return -1;
    }
    if (a.artist.toLowerCase() > b.artist.toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

const sortByYear = () => {
  vinyls.value.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  });
}

const sortByDate = () => {
  vinyls.value.sort((a, b) => {
    let dateA = new Date(a.addDate).getTime();
    let dateB = new Date(b.addDate).getTime();
    return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
  })
}


watchEffect(() => {
  authPage.value = route.name === 'Login' || route.name === 'Register'
  welcomePage.value = route.name === 'Welcome'
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

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: inherit;
  padding-bottom: 60px;

  &__container {
    height: 100%;
  }
}


// SLIDE transition animation
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-out;
}
</style>