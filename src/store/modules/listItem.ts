import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {Item, ListItem} from '@/store/models';
import {deleteItem, getListItem, updateItem} from '../api';
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

  @Action({commit: 'updateListItem'})
  async updateItem(item: Item) {
    const data = await updateItem(item);
    if (data?.meta?.status) {
      return data.data;
    }
  }

  @Mutation
    updateListItem(data: Item) {
    const newList = this.listItem && this.listItem.map((newItem: Item) => {
      if (newItem.id === data.id) {
        newItem.name = data.name;
        newItem.price = data.price;
        newItem.link = data.avatar;
      }
      return newItem;
    });
    this.meta = {
      message: 'Update item successfully',
      status: true,
      type: 'success',
    };
    this.listItem = newList;
    return {meta: this.meta, listItem: this.listItem };
  }

  @Action({commit: 'deleteItem'})
  async deleteItemList(item: Item) {
    const data = await deleteItem(item);
    if (data?.meta?.status) {
      return data?.data;
    }
  }

  @Mutation
  deleteItem(data: Item) {
    const getData = data;
    const newList = this.listItem && this.listItem.filter((item: Item) => item.id !== getData.id);
    return this.listItem = newList;
  }
}

export default getModule(ListItemModule);
