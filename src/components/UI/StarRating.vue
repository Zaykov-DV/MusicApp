<template>
  <div class="rating">
    <ul class="list">
      <li :key="star" v-for="star in maxStars" :class="{ 'active': star <= dbStars }" @click="rate(star)" class="star">
        <span>★</span>
      </li>
    </ul>
    <span v-if="hasCounter === true">{{ stars || dbStars }} of {{ maxStars }}</span>
  </div>
</template>

<script setup>

import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(['changeRating'])

const props = defineProps({
  dbStars: {
    type: Number
  },
  maxStars: {
    type: Number,
    default: 5
  },
  hasCounter: {
    type: Boolean,
    default: true
  }
})

const stars = ref(0)


const rate = (star) => {
  if (typeof star === 'number' && star <= props.maxStars && star >= 0) {
    stars.value = stars.value === star ? star - 1 : star
  }
  emit('changeRating', stars.value);
}

</script>

<style scoped lang="scss">
$active-color: #51C4D3;

.rating {
  font-size: 22px;
  color: #a7a8a8;
}

.list {
  margin: 0 0 5px 0;
  padding: 0;
  list-style-type: none;

  &:hover {
    .star {
      color: $active-color;
    }
  }
}

.star {
  display: inline-block;
  cursor: pointer;
  font-size: 28px;

  &:hover {
    & ~ .star {
      &:not(.active) {
        color: inherit;
      }
    }
  }
}

.active {
  color: $active-color;
}
</style>
