<template>
  <div class="app">
    <header v-if="!welcomePage && !authPage">
      <h3>Music App</h3>
    </header>
    <main class="main">
      <div class="main__container">
        <router-view />
      </div>
    </main>
    <footer v-if="!authPage && !welcomePage" class="footer">
      <router-link class="footer__action" :to="'/'">
        <i class="fa fa-home"></i>
        Home
      </router-link>
      <div class="footer__action" v-if="!notFoundPage" @click="toggleModal">
        <i class="fa fa-solid fa-compact-disc"></i>
        Add Vinyl
      </div>
      <div class="footer__action" v-if="!notFoundPage" @click="handleSignOut">
        <i class="fa fa-sign-out-alt"></i>
        Exit
      </div>
    </footer>
    <AddVinyl v-show="modalOpen"
              v-on:close-modal="toggleModal"/>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import AddVinyl from "@/components/AddVinyl";
import { getAuth, signOut } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)

const toggleModal = () => {
  modalOpen.value = !modalOpen.value
}

const authPage = ref(false)
const notFoundPage = ref(false)
const welcomePage = ref(false)

watchEffect(() => {
  authPage.value = route.name === 'Login' || route.name === 'Register'
  notFoundPage.value = route.name === 'NotFound'
  welcomePage.value = route.name === 'Welcome'
})

const handleSignOut = () => {
  const auth = getAuth()

  signOut(auth)
      .then(() => {
        router.push({name: 'Login'})
      })
}
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
  background: inherit;

  &__container {
    height: 100%;
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
    color: #fff;
    text-decoration: none;
    white-space: nowrap;

    i {
      margin-right: 8px;
    }
  }
}
</style>