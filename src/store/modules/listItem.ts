import { Module } from 'vuex';
import { ListItem } from '@/store/models';
import { getListItem } from '../api';

export const state: ListItem = {
  listItem: undefined,
  meta: undefined,
};

export const actions = {
  async getListItem(store: any) {
    const data = await getListItem();
    if(data?.meta?.status) {
      store.commit('setListItem', data);
      return data;
    }
  },
};

export const mutations = {
  setListItem(state: any, data: any) {
    return state.listItem = data.data;
  },
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
};
