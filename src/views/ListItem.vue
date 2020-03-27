<template slot='listData' slot-scope='props'>
  <div>
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
          <i class="fas fa-edit"></i>
          <i class="far fa-trash-alt"></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  name: '',
  computed: {
    ...mapState(['listItem']),
  },
  methods: {
   ...mapActions(['getListItem']),
  },
})
export default class ListItem extends Vue {
  listData = [];

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