<template>
  <div class="container-fluid">
    <div class="dashboard">
      <Menu />
      <div class="dashboard__content">
        <h3>List Item</h3>
        <ListItem />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import ListItem from '@/views/ListItem';
import Menu from '@/components/Menu';


@Component({
  components: {
    Menu,
    ListItem,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
  @import '@/assets/home.scss';
</style>
