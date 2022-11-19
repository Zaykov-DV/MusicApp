<template>
  <div class="app">
    <header v-if="!welcomePage && !authPage">
      <h3>Music App</h3>
    </header>
    <main class="main">
      <div class="main__container">
        <router-view :edit="edit" v-slot="{ Component }">
          <Transition name="slide" mode="out-in">
            <Component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>
    <Footer v-if="!authPage && !welcomePage" v-on:edit-vinyls="toggleEdit"/>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import Footer from "@/components/Footer";

const route = useRoute()
const authPage = ref(false)
const welcomePage = ref(false)
const edit = ref(false)

const toggleEdit = () => {
  edit.value = !edit.value
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


// SLIDE transition animation
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-out;
}
</style>