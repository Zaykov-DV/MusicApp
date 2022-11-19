<template>
  <footer class="footer">
    <router-link class="footer__action" :to="'/'">
      <i class="fa fa-home"></i>
      Home
    </router-link>
    <router-link class="footer__action" v-if="!notFoundPage" :to="{ name: 'AddVinyl' }" >
      <i class="fa fa-solid fa-compact-disc"></i>
      Add Vinyl
    </router-link>
    <div class="footer__action" v-if="!notFoundPage" @click="editVinyls" ref="isEdit">
      <i class="fa fa-solid fa-edit"></i>
      Edit Vinyls
    </div>
    <div class="footer__action" v-if="!notFoundPage" @click="handleSignOut">
      <i class="fa fa-sign-out-alt"></i>
      Exit
    </div>
  </footer>
</template>

<script setup>
import { ref, watchEffect, defineEmits } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const notFoundPage = ref(false)
const isEdit = ref(null)

const emit = defineEmits(['edit-vinyls'])

const editVinyls = () => {
  isEdit.value.classList.toggle('is-active')
  emit('edit-vinyls')
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
    height: 40px;
    color: #fff;
    text-decoration: none;
    white-space: nowrap;

    i {
      margin-right: 8px;
    }

    &.is-active {
      color: #51C4D3;
    }
  }
}

.router-link-active {
  color: #51C4D3;
}

</style>