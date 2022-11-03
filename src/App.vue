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
    <Footer v-if="!authPage && !welcomePage"/>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";

import { useRoute } from "vue-router";
import Footer from "@/components/Footer";

const route = useRoute()

const authPage = ref(false)
const welcomePage = ref(false)

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
</style>