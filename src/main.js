import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, fas)

firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
})