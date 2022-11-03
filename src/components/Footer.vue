<template>
  <footer class="footer">
    <router-link class="footer__action" :to="'/'">
      <i class="fa fa-home"></i>
      Home
    </router-link>
    <div class="footer__action" v-if="!notFoundPage" @click="addVinyl">
      <i class="fa fa-solid fa-compact-disc"></i>
      Add Vinyl
    </div>
    <div class="footer__action" v-if="!notFoundPage" @click="handleSignOut">
      <i class="fa fa-sign-out-alt"></i>
      Exit
    </div>
  </footer>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const notFoundPage = ref(false)

const addVinyl = () => {
  router.push({name: 'AddVinyl'})
}

const handleSignOut = () => {
  const auth = getAuth()

  signOut(auth)
      .then(() => {
        router.push({name: 'Login'})
      })
}

watchEffect(() => {
  notFoundPage.value = route.name === 'NotFound'
})

</script>

<style scoped lang="scss">
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