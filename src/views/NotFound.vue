<template>
  <div class="not-found">
    <div class="not-found__container">
      <div class="not-found__error">404</div>
      <h3 class="not-found__info">Page not found</h3>
<!--      <router-link class="not-found__router-link" :to="{ name: 'Home' }">Back to Home Page</router-link>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>

.not-found {
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    height: 100%;
  }

  &__error {
    text-align: center;
    font-family: 'Gilda Display', serif;
    font-size: 95px;
    font-style: italic;
    line-height: 60px;
    animation: noise 2s linear infinite;

    &:after {
      content: '404';
      font-family: 'Gilda Display', serif;
      font-size: 100px;
      font-style: italic;
      text-align: center;
      width: 150px;
      height: 60px;
      line-height: 60px;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      color: blue;
      animation: noise-1 .2s linear infinite;
    }

    &:before {
      content: '404';
      font-family: 'Gilda Display', serif;
      font-size: 100px;
      font-style: italic;
      text-align: center;
      width: 100px;
      height: 60px;
      line-height: 60px;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      color: red;
      animation: noise-2 .2s linear infinite;
    }
  }

  &__info {
    text-align: center;
    font-family: 'Gilda Display', serif;
    font-size: 15px;
    font-style: italic;
    width: 200px;
    height: 60px;
    line-height: 60px;
    animation: noise-3 1s linear infinite;
  }
}

@keyframes noise-1 {
  0%, 20%, 40%, 60%, 70%, 90% {opacity: 0;}
  10% {opacity: .1;}
  50% {opacity: .5; left: -6px;}
  80% {opacity: .3;}
  100% {opacity: .6; left: 2px;}
}

@keyframes noise-2 {
  0%, 20%, 40%, 60%, 70%, 90% {opacity: 0;}
  10% {opacity: .1;}
  50% {opacity: .5; left: 6px;}
  80% {opacity: .3;}
  100% {opacity: .6; left: -2px;}
}

@keyframes noise {
  0%, 3%, 5%, 42%, 44%, 100% {opacity: 1; transform: scaleY(1);}
  4.3% {opacity: 1; transform: scaleY(1.7);}
  43% {opacity: 1; transform: scaleX(1.5);}
}

@keyframes noise-3 {
  0%,3%,5%,42%,44%,100% {opacity: 1; transform: scaleY(1);}
  4.3% {opacity: 1; transform: scaleY(4);}
  43% {opacity: 1; transform: scaleX(10) rotate(60deg);}
}
</style>