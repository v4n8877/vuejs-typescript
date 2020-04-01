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
        v-else-if="nameModal === 'delete'"
        slot='content'
        @modalClose='controlHideModal()'
        @deleteItem='deleteItem()'
      />

      <FormItem
        v-else
        slot='content'
        :choiceParentItem='choiceItem'
        @modalClose='controlHideModal()'
        @editItem='addNewItem()'
        @changeFile='getFiles'
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
      <tr v-for="item in dataList" :key="item.id" @click.prevent="showDetailItem(item.id)">
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
          <img class="icon-group" alt src="@/assets/add.svg" @click="controlShowModal('add')"/>
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
import listItems from '@/store/modules/listItem';


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

    } else if (name === 'delete') {
      this.nameModal = name;
      this.choiceItem = {...item};
    } else {
      this.nameModal = name;
      this.choiceItem = {} as Item;
    }
    this.showModal = true;
  }

   controlHideModal() {
    this.choiceItem = {} as Item;
    this.showModal = false;
  }

  editItem() {
    listItems.updateItem(this.choiceItem);
    this.showModal = false;
  }

  deleteItem() {
    listItems.deleteItemList(this.choiceItem);
    this.showModal = false;
  }

  addNewItem() {
    listItems.addItem(this.choiceItem);
    this.showModal = false;
  }

  async showDetailItem(item: Item) {
    await this.$router.push(`/detail/${item}`);
  }

  get dataList() {
    return listItems.listItem;
  }

  get getNotifications() {
    return listItems.meta;
  }

  getFiles(value: any) {
    const filesImage = {file: value, url: URL.createObjectURL(value[0])};
    this.choiceItem = {...this.choiceItem, link: filesImage.url, avatar: filesImage.file[0]};
    return this.choiceItem;
  }

  mounted() {
    listItems.getListItem();
  }
}
</script>

<style lang="scss">
  @import '@/assets/table.scss';
</style>
