<template>
  <div class="loading">
    <span class="loading__icon"></span>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #132C33 0%, rgba(56, 134, 156, 0) 100%), #132C33;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__icon {
    background: url("/src/assets/vinyl-svgrepo-com.svg") no-repeat center/cover;
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    animation: spin ease 1000ms infinite;
  }
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>