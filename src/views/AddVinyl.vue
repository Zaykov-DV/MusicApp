<template>
  <div class="add-vinyl">
    <div class="add-vinyl__wrapper">
      <h2 class="add-vinyl__title">Add Vinyl</h2>
      <div class="add-vinyl__form">
        <input class="add-vinyl__input" type="text" id="artist" placeholder="Artist" v-model="artist">
        <input class="add-vinyl__input" type="text" id="album" placeholder="Album" v-model="album">
        <input class="add-vinyl__input" type="number" id="year" placeholder="Year" v-model="year">
        <textarea rows="10" class="add-vinyl__input" id="playlist" placeholder="Playlist" v-model="playlist"></textarea>
        <div class="add-vinyl__img">
          <input style="display: none" type="file" ref="fileInput" accept="image/*" @change="onFilePicked">
          <button class="add-vinyl__button" @click="onPickFile">Add Album Cover</button>
          <div class="add-vinyl__img-wrapper">
            <img :src="imageUrl" alt="">
          </div>
        </div>
      </div>
      <button @click="addVinyl" class="add-vinyl__button">Add New Vinyl</button>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script setup>
import Loading from "@/components/UI/Loading";
import db from '../firebase'
import {ref} from "vue";

const loading = ref(false)
const artist = ref('')
const album = ref('')
const year = ref('')
const playlist = ref('')
const rating = ref(null)
let imageUrl = ref('')
let image = ref(null)

const fileInput = ref(null)

const onPickFile = () => {
  fileInput.value.click()
}

const onFilePicked = (event) => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf('.') <= 0) {
    return alert('Please add a valid file!')
  }
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    imageUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0]);
  image.value = files[0]
}

const addVinyl = async () => {
  let id = Math.round(Math.random()) * 10
  try {
    loading.value = true
    await db.collection('vinyls')
        .doc()
        .set({
          id: id + year.value,
          artist: artist.value,
          album: album.value,
          year: year.value,
          playlist: playlist.value,
          rating: rating.value,
          imageUrl: imageUrl.value
        })
        .then(() => {
          reset()
        })
        .then(() => {
          loading.value = false
        })
  } catch {
    console.log('error')
  }
}

const reset = () => {
  artist.value = ''
  album.value = ''
  year.value = ''
  playlist.value = ''
  rating.value = null
  imageUrl.value = ''
}

</script>

<style lang="scss" scoped>
.add-vinyl {
  height: 100%;

  &__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(180deg, #132C33 0%, rgba(56, 134, 156, 0) 100%), #132C33;
  }

  &__title {
    color: #fff;
  }

  &__form {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }

  &__img {
    display: flex;
    align-items: flex-start;

    img {
      padding: 4px;
      max-height: 200px;
      max-width: 200px;
    }
  }

  &__img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    margin-left: 40px;
  }

  &__label {
    color: #fff;
  }

  &__input {
    color: #fff;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #fff;
    padding: 6px 4px;
    margin: 10px 0 20px;
    width: 100%;

    &:focus {
      outline: none;
    }
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
  }
}
</style>
