<template>
  <div @click="goToVinyl" class="vinyl__item">
    <img class="vinyl__img" :src="vinyl.imageUrl" alt="cover">
    <div class="vinyl__info">
      <p class="vinyl__album">{{vinyl.album}}</p>
      <p class="vinyl__artist">{{vinyl.artist}}</p>
      <span class="vinyl__year">{{vinyl.year}}</span>
    </div>
    <button class="vinyl__delete" @click.stop="removeVinyl">
      <i class="fa fa-solid fa-trash"></i>
    </button>
  </div>
</template>

<script setup>
import {ref, defineProps} from "vue";
import db from '../firebase'
import {useRouter} from "vue-router";

const router = useRouter()
const id = ref(null)

const props = defineProps({
  vinyl: Object
})

const goToVinyl = () => {
  router.push({name: 'Info', params: {id: props.vinyl.id}})
}

const removeVinyl = () => {
  db.collection('vinyls')
      .where('id', '==', `${props.vinyl.id}`)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          id.value = doc.id
        })
      })
      .then(() => {
        db.collection('vinyls').doc(id.value).delete()
      })
}
</script>