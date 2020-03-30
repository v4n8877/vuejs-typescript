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
          <img alt :src="item.avatar">
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
import { mapState, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import FormItem from '@/components/FormItem.vue';
import Confirmation from '@/components/Confirmation.vue';
import Notifications from '@/components/Notifications.vue';
import { Item } from '@/store/models';

@Component({
  components: {
    Modal,
    FormItem,
    Confirmation,
    Notifications,
  },
  computed: {
    ...mapState(['listItem', 'meta']),
  },
  methods: {
   ...mapActions(['getListItem', 'updateItem', 'deleteItemList']),
  },
})
export default class ListItem extends Vue {
  listData = [];
  showModal = false;
  choiceItem = {};
  nameModal = '';

  controlShowModal(name: string, item: Item) {
    if (name === 'edit') {
      this.nameModal = name;
      this.choiceItem = {...item};
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
    this.$store.dispatch('updateItem', this.choiceItem);
    this.showModal = false;
  }

  deleteItem() {
    this.$store.dispatch('deleteItemList', this.choiceItem);
    this.showModal = false;
  }

  get dataList() {
    this.listData = this.$store.state.listItem.listItem;
    return this.listData;
  }

  get getNotifications() {
    return this.$store.state.listItem.meta;
  }

  mounted() {
    this.$store.dispatch('getListItem');
  }
}
</script>

<style lang="scss">
  @import '@/assets/table.scss';
</style>