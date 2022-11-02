<template>
  <div class="auth">
    <img class="auth__img" src="../assets/vinyl-white.png" alt="vinyl">
    <div class="auth__container">
      <p class="auth__link">
        Don't have account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2 class="auth__title">Login in MyVinyls App</h2>
      <form class="auth__inputs" @submit.prevent="signIn">
        <BaseInput class="auth__input" type="text" placeholder="Email" v-model="email"/>
        <div class="auth__input">
          <BaseInput v-if="showPassword" type="text" placeholder="Password" v-model="password"  withIcon="true">
            <slot>
              <div class="auth__icon" @click="toggleShow">
                <i v-if="showPassword" class="fa fa-solid fa-eye"></i>
              </div>
            </slot>
          </BaseInput>
          <BaseInput v-else type="password" placeholder="Password" v-model="password" withIcon="true">
            <slot>
              <div class="auth__icon" @click="toggleShow">
                <i v-if="!showPassword" class="fa fa-solid fa-eye-slash"></i>
              </div>
            </slot>
          </BaseInput>
        </div>
        <div class="auth__actions">
          <button class="auth__button" type="submit">Sign In</button>
          <button class="auth__button" @click.prevent="signInWithGoogle">
            <i class="auth__button-icon fab fa-google"></i>
            Sign In with Google
          </button>
        </div>
      </form>
      <span class="auth__error" v-show="errorMessage !== ''">{{ errorMessage }}</span>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useRouter} from 'vue-router'
import BaseInput from "../components/UI/BaseInput";
import Loading from "@/components/UI/Loading";

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const showPassword = ref(false)

const loading = ref(false)

const toggleShow = () => {
  showPassword.value = !showPassword.value;
}

const signIn = () => {
  loading.value = true
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.push({name: 'Home'});
        console.log('login')
        errorMessage.value = ''
      })
      .then(() => {
        loading.value = false
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Invalid email';
            break;
          case 'auth/user-not-found':
            errorMessage.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errorMessage.value = 'Incorrect password';
            break;
          default:
            errorMessage.value = 'Email or password was incorrect';
            break;
        }
      })
}

const signInWithGoogle = () => {
  loading.value = true
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then(() => {
        router.push({name: 'Home'})
      })
      .then(() => {
        loading.value = false
      })
      .catch((error) => {
        errorMessage.value = error
        console.log(error)
      })
}

</script>


<style lang="scss">
.auth {
  height: 100%;
  background: linear-gradient(180deg, #132C33 0%, rgba(56, 134, 156, 0.42) 100%), #132C33;
  position: relative;

  &__img {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  &__link {
    color: #fff;
    margin-bottom: 30px;

    .router-link {
      color: #5dbaf6;
      text-decoration: none;
    }
  }

  &__title {
    color: #fff;
    margin-bottom: 20px;
  }

  &__inputs {
    width: 80%;
    margin-bottom: 20px;
  }

  &__input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    &_register {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 16px;
    }
  }

  &__icon {
    position: absolute;
    right: 8px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #51C4D3;
    border: 2px solid transparent;
    margin-bottom: 8px;
    color: #FFF;
    text-decoration: none;

    &:first-child {
      flex: 1;
      margin-right: 16px;
    }
  }

  &__button-icon {
    margin-right: 4px;
  }

  &__error {
    color: #ff7777;
    text-align: center;
    margin-top: 2px;
  }

  &__actions {
    display: flex;
    align-items: center;
  }
}


.forgot-password {
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-size: 14px;
  margin: 16px 0 32px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease all;

  &:hover {
    border-color: #303030;
  }
}

</style>