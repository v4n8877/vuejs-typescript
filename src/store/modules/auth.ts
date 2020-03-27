import { Module } from 'vuex';
import { UserResponse, UserSubmit, User } from '@/store/models';
import { loginUser, clearJWT } from '../api';
import router from '@/router';

export const state: UserResponse = {
  data: undefined,
  meta: undefined,
};

export const actions = {
  async login(store: any, userSubmit: UserSubmit) {
    const data = await loginUser(userSubmit);
    if (data?.meta && data.meta.status) {
      store.commit('setToke', data.data);
      router.push('/home');
      return data.data;
    }
  },
  logout(store: any) {
    clearJWT();
    localStorage.removeItem('USER_TOKEN');
    store.commit('logout');
  },
};

export const mutations = {
  setToke(state: any, data: any) {
    localStorage.setItem('USER_TOKEN', JSON.stringify(data.token));
    return state.data = data;
  },
  logout(state: any) {
    return state.data = {};
  },
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
};
