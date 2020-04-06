<template>
  <div class="content">
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import authLogin from '@/store/modules/auth';


@Component({
  name: 'Login',
})
export default class Login extends Vue {
  email = '';
  password = '';

  @Emit()
  loginA() {
    authLogin.login({
      email: this.email,
      password: this.password,
    });
  }

}
</script>

<style lang="scss">
  @import '@/assets/login.scss';
</style>

