import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { UserResponse, UserSubmit } from '@/store/models';
import { loginUser, clearJWT } from '../api';
import router from '@/router';
import store from '@/store';
import {Vue} from 'vue-property-decorator';

@Module({
  namespaced: true,
  name: 'auth',
  store,
  dynamic: true,
})

class AuthModule extends VuexModule {
  data: UserResponse['data'] | {} = {};
  meta: UserResponse['data'] | {} = {};

  @Action({rawError: true})
  async login(userSubmit: UserSubmit) {
    const data = await loginUser(userSubmit);
    if (data?.meta && data.meta.status && data?.data) {
      this.context.commit('setToke', data.data);
    } else {
      this.context.commit('authErr', data?.meta);
    }
  }

  @Mutation
  setToke(data: UserResponse['data']) {
    // @ts-ignore
    localStorage.setItem('USER_TOKEN', JSON.stringify(data.token));
    Vue.notify({
      group: 'foo',
      type: 'success',
      title: 'Login',
      text: 'Login successfully',
    });
    router.push('/home');
    this.data = data;
    this.meta = {
      message: 'Login successfully',
      status: true,
      type: 'success',
    };
    return {meta: this.meta, data: this.data };
  }

  @Mutation
  authErr(meta: UserResponse['meta']) {
    Vue.notify({
      group: 'foo',
      type: 'error',
      title: 'Login',
      text: meta?.message,
    });
  }

  @Action({commit: 'removeAuth', rawError: true})
  logout() {
    clearJWT();
    localStorage.removeItem('USER_TOKEN');
    Vue.notify({
      group: 'foo',
      type: 'success',
      title: 'Logout',
      text: 'Logout successfully',
    });
  }

  @Mutation
  removeAuth() {
    this.data = null;
  }
}

export default getModule(AuthModule);
