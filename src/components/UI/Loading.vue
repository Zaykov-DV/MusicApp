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
  height: calc(100% - 46px);
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #0A2228;
  position: absolute;

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