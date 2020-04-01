<template>
  <div class="container-fluid">
    <div class="dashboard">
      <Menu />
      <div class="dashboard__content">
        <div class="dashboard__content_card">
          <div class="dashboard__content_card_form">
            <div class="dashboard__content_card_form-item">
              <img :src="infoItem && infoItem.avatar" alt />
            </div>
            <div class="dashboard__content_card_form-item">
              <p>Name: <span>{{ infoItem && infoItem.name }}</span></p>
              <p>Price: <span>{{ infoItem && infoItem.price }}</span></p>
              <p>Create day: <span>{{ infoItem && infoItem.created_at }}</span></p>
              <p>Update day: <span>{{ infoItem && infoItem.updated_at }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import Menu from '@/components/Menu';
  import { Item } from '@/store/models';
  import listItems from '@/store/modules/listItem';

  @Component({
    components: {
      Menu,
    },
  })
  export default class DetailItem extends Vue {

    get infoItem() {
      return listItems.detailItem;
    }

    mounted() {
      listItems.getDetail(parseFloat(this.$route.params.id));
    }
  }
</script>

<style lang="scss">

</style>
