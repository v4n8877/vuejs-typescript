<template slot-scope='props'>
  <div>
    <Modal 
      v-show='showModal'
      @close='controlHideModal()'
    >
      <FormItem
        slot='content'
        :choiceParentItem='choiceItem'
        @modalClose='controlHideModal()'
        @editItem='editItem()'
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
          <img class="icon-group" alt src="@/assets/edit.svg" @click="controlShowModal(item)"/>
          <img class="icon-group" alt src="@/assets/delete.svg" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import FormItem from '@/components/FormItem.vue';

@Component({
  components: {
    Modal,
    FormItem
  },
  computed: {
    ...mapState(['listItem']),
  },
  methods: {
   ...mapActions(['getListItem', 'updateItem']),
  },
})
export default class ListItem extends Vue {
  listData = [];
  showModal = false;
  choiceItem = {};

  controlShowModal(item) {
    this.showModal = true;
    this.choiceItem = {...item};
  }

   controlHideModal() {
    this.showModal = false;
  }

  editItem() {
    this.$store.dispatch('updateItem', this.choiceItem);
    this.showModal = false;
  }

  get dataList() {
    this.listData = this.$store.state.listItem.listItem;
    return this.listData;
  }

  mounted() {
    this.$store.dispatch('getListItem');
  }
}
</script>

<style lang="scss">
  @import '@/assets/table.scss';
</style>