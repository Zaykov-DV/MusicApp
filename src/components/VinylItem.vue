<template>
  <div @click="goToVinyl" class="vinyl__item">
    <img class="vinyl__img" :src="vinyl.imageUrl" alt="cover">
    <div class="vinyl__info">
      <p class="vinyl__album">{{ vinyl.album }}</p>
      <p class="vinyl__artist">{{ vinyl.artist }}</p>
      <span class="vinyl__year">{{ vinyl.year }}</span>
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

<style scoped lang="scss">

.vinyl {
  &__item {
    display: flex;
    align-items: center;
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

  &__delete {
    background: #51C4D3;
    color: #0e0c0c;
    margin-left: auto;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
  }
}
</style>