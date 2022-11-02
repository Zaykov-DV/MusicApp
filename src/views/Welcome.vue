<template>
    <div class="welcome">
      <div class="welcome__logo"></div>

      <h1 class="welcome__title">Welcome To My Vinyls</h1>

      <div class="welcome__links">
        <router-link class="welcome__link" to="/register"><h3>Sign Up</h3></router-link>
        <router-link class="welcome__link welcome__link_login" to="/login"><h3>Log In</h3></router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style scoped lang="scss">
.welcome {
  height: 100vh;
  background: url('/src/assets/welcome.png') no-repeat center/cover;
  padding: 15% 40px 40px;
  display: flex;
  flex-direction: column;
  text-align: center;

  &__logo {
    width: 150px;
    height: 150px;
    margin: 0 auto 40%;
    background: url('/src/assets/vinyl-svgrepo-com.svg') no-repeat center/cover;
  }

  &__title {
    color: #fff;
    flex: 1;
  }

  &__links {
    display: flex;
    flex-direction: column;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    border-radius: 8px;
    background-color: #51C4D3;
    border: 2px solid transparent;
    margin-bottom: 8px;
    color: #FFF;
    text-decoration: none;

    &_login {
      background-color: transparent;
      border: 2px solid #51C4D3;
      color: #51C4D3;
    }
  }

}
</style>