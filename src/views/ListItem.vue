<template slot-scope='props'>
  <div>
    <Modal
      v-show='showModal'
      @close='controlHideModal()'
    >
      <FormItem
        v-if="nameModal === 'edit'"
        slot='content'
        :choiceParentItem='choiceItem'
        @modalClose='controlHideModal()'
        @editItem='editItem()'
        @changeFile='getFiles'
      />

      <Confirmation
        v-if="nameModal === 'delete'"
        slot='content'
        @modalClose='controlHideModal()'
        @deleteItem='deleteItem()'
      />
    </Modal>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Create at</th>
        <th>Update at</th>
      </tr>
      <tr v-for="item in dataList" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <img alt :src="item && item.link? item.link : item.avatar">
          {{ item.name }}
        </td>
        <td>{{ item.price }}</td>
        <td>{{ item.created_at }}</td>
        <td>
          {{ item.updated_at }}
          <img class="icon-group" alt src="@/assets/edit.svg" @click="controlShowModal('edit', item)"/>
          <img class="icon-group" alt src="@/assets/delete.svg" @click="controlShowModal('delete', item)"/>
          <img class="icon-group" alt src="@/assets/add.svg" />
        </td>
      </tr>
    </table>
    <Notifications
      :meta='getNotifications'
    />
  </div>
</template>

<script lang='ts'>
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import FormItem from '@/components/FormItem.vue';
import Confirmation from '@/components/Confirmation.vue';
import Notifications from '@/components/Notifications.vue';
import { Item } from '@/store/models';
import listItem from '@/store/modules/listItem';

@Component({
  components: {
    Modal,
    FormItem,
    Confirmation,
    Notifications,
  },
})
export default class ListItem extends Vue {
  showModal = false;
  choiceItem = {} as Item;
  nameModal = '';

  controlShowModal(name: string, item: Item) {
    if (name === 'edit') {
      this.nameModal = name;
      this.choiceItem = {...item, link: item.avatar};

    } else {
      this.nameModal = name;
      this.choiceItem = {...item};
    }
    this.showModal = true;
  }

   controlHideModal() {
    this.showModal = false;
  }

  editItem() {
    listItem.updateItem(this.choiceItem);
    this.showModal = false;
  }

  deleteItem() {
    listItem.deleteItemList(this.choiceItem);
    this.showModal = false;
  }

  get dataList() {
    return listItem.listItem;
  }

  get getNotifications() {
    return listItem.meta;
  }

  getFiles(value: any) {
    const filesImage = {file: value, url: URL.createObjectURL(value[0])};
    this.choiceItem = {...this.choiceItem, link: filesImage.url, avatar: filesImage.file[0]};
    return this.choiceItem;
  }

  mounted() {
    listItem.getListItem();
  }
}
</script>

<style lang="scss">
  @import '@/assets/table.scss';
</style>
