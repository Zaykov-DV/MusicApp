<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal__wrapper" ref="modalWrapper">
      <div @click="$emit('close-modal')" ref="modal">x</div>
      <input class="modal__input" type="text" id="artist" placeholder="artist" v-model="artist">
      <input class="modal__input" type="text" id="album" placeholder="album" v-model="album">
      <input class="modal__input" type="number" id="year" placeholder="year" v-model="year">
      <textarea rows="10" class="modal__input" id="playlist" placeholder="playlist" v-model="playlist"></textarea>
      <input style="display: none" type="file" ref="fileInput" accept="image/*" @change="onFilePicked">
      <button @click="onPickFile">add photo</button>
      <img :src="imageUrl" alt="" style="max-height: 200px">
      <button @click="addCity" class="modal__button">add</button>
    </div>
  </div>
</template>

<script setup>
import db from '../firebase'
import {ref, defineEmits} from "vue";

const emit = defineEmits(['close-modal'])

const artist = ref('')
const album = ref('')
const year = ref('')
const playlist = ref('')
const rating = ref(null)
let imageUrl = ref('')
let image = ref(null)

const fileInput = ref(null)
const modal = ref(null)

const onPickFile = () => {
  fileInput.value.click()
}

const closeModal = (e) => {
  if (e.target === modal.value) emit('close-modal')
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

const addCity = async () => {
  let id = Math.round(Math.random()) * 10
  try {
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
            }
        )
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
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    background-color: #222325;
    color: #fff;
    padding: 6px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
</style>
