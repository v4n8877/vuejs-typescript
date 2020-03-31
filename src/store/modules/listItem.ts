import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { ListItem, Item } from '@/store/models';
import { getListItem, updateItem, deletItem } from '../api';
import store from '@/store';

@Module({
  namespaced: true,
  name: 'listItem',
  store,
  dynamic: true,
})

class ListItemModule extends VuexModule {
  listItem: ListItem['data'] | null = null;
  meta: ListItem['meta'] | null = null;

  @Action({commit: 'setListItem'})
  async getListItem() {
    const data = await getListItem();
    if (data?.meta?.status) {
      return data.data;
    }
  }

   @Mutation
   setListItem(data: ListItem['data']) {
    return this.listItem = data;
  }
}

export default getModule(ListItemModule);

// export const state: ListItem = {
//   listItem: undefined,
//   meta: undefined,
// };
//
// export const actions = {
//   async getListItem(store: any) {
//     const data = await getListItem();
//     if (data?.meta?.status) {
//       store.commit('setListItem', data);
//       return data;
//     }
//   },
//
//   async updateItem(store: any, item: Item) {
//     const data = await updateItem(item);
//     if (data?.meta?.status) {
//       store.commit('updateListItem', data);
//       return data;
//     }
//   },
//
//   async deleteItemList(store: any, item: Item) {
//     const data = await deletItem(item);
//     if (data?.meta?.status) {
//       store.commit('deleteItemList', data);
//       return data;
//     }
//   },
// };
//
// export const mutations = {
//   setListItem(state: any, data: any) {
//     return state.listItem = data.data;
//   },
//
//   updateListItem(state: any, data: any) {
//     const getData = data.data;
//     const newList = state.listItem.map((newItem: Item) => {
//       if(newItem.id === getData.id) {
//         newItem.name = getData.name;
//         newItem.price = getData.price;
//         newItem.link = getData.avatar
//       }
//       return newItem;
//     });
//     const newMeta = {
//       message: 'Update item succesfully',
//       status: true,
//       type: 'succes',
//     }
//     state.meta = newMeta;
//     state.listItem = newList;
//     return state
//   },
//
//   deleteItemList(state: any, data: any) {
//     const getData = data.data;
//     const newList = state.listItem.filter((item: Item) => item.id !== getData.id);
//     return state.listItem = newList;
//   }
// };
//
// export default {
//   namespace: true,
//   state,
//   mutations,
//   actions,
// };
