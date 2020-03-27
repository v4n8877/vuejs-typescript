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
import { mapState, mapGetters, mapActions } from 'vuex';

@Component({
  name: 'Login',
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
   ...mapActions('auth', ['login']),
  },
})
export default class Login extends Vue {
  email = '';
  password = '';
  // get dataList() {
  //   this.email = this.$store.state.auth.user;
  //   console.log('1====', this.$store.state.user)
  //   return this.$store.state.auth.user;
  // }

  // mounted() {
  //   if (this.$store.state.auth.user) {

  //     this.email = this.$store.state.auth.user.email;
  //   }
  //   console.log('1', this.$store.state.auth.user);
  // }

  loginA() {
    this.$store.dispatch('login', {
      email: this.email,
      password: this.password,
    });
  }
}
</script>

<style lang="scss">
  @import '@/assets/login.scss';
</style>

