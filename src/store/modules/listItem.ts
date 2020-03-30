import { Module } from 'vuex';
import { ListItem, Item } from '@/store/models';
import { getListItem, updateItem } from '../api';

export const state: ListItem = {
  listItem: undefined,
  meta: undefined,
};

export const actions = {
  async getListItem(store: any) {
    const data = await getListItem();
    if (data?.meta?.status) {
      store.commit('setListItem', data);
      return data;
    }
  },
  async updateItem(store: any, item: Item) {
    const data = await updateItem(item);
    if (data?.meta?.status) {
      store.commit('updateListItem', data);
      return data;
    }
  }
};

export const mutations = {
  setListItem(state: any, data: any) {
    return state.listItem = data.data;
  },
  updateListItem(state: any, data: any) {
    const getData = data.data;
    const newList = state.listItem.map((newItem: Item) => {
      if(newItem.id === getData.id) {
        newItem.name = getData.name;
        newItem.price = getData.price
      }
      return newItem;
    });
    return state.listItem = newList;
  },
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
};
