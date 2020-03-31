<template>
  <form @submit.prevent>
    <div class="container">
      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        v-model="email"
        required
      >

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        v-model="password"
        required
      >

      <button @click="loginA()">Login</button>
    </div>
  </form>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/store/modules/auth';

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  email = '';
  password = '';

  loginA() {
    auth.login({
      email: this.email,
      password: this.password,
    });
  }
}
</script>

<style lang="scss">
  @import '@/assets/login.scss';
</style>

