import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { UserResponse, UserSubmit } from '@/store/models';
import { loginUser, clearJWT } from '../api';
import router from '@/router';
import store from '@/store';

@Module({
  namespaced: true,
  name: 'auth',
  store,
  dynamic: true,
})

class AuthModule extends VuexModule {
  data: UserResponse['data'] | null = null;
  meta: UserResponse['meta'] | null = null;

  @Action({commit: 'setToke'})
  async login(userSubmit: UserSubmit) {
    const data = await loginUser(userSubmit);
    if (data?.meta && data.meta.status) {
      return data.data;
    }
  }

  @Mutation
  setToke(data: UserResponse['data']) {
    // @ts-ignore
    localStorage.setItem('USER_TOKEN', JSON.stringify(data.token));
    router.push('/home');
    this.data = data;
  }

  @Action({commit: 'removeAuth'})
  logout() {
    clearJWT();
    localStorage.removeItem('USER_TOKEN');
  }

  @Mutation
  removeAuth() {
    this.data = null;
  }
}

export default getModule(AuthModule);
