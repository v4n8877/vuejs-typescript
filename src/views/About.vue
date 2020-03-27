<template>
  <div class="container-fluid">
    <div class="dashboard">
      <Menu />
      <div class="dashboard__content">
        <h3>About</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu';

@Component({
  components: {
    Menu,
  },
})
export default class About extends Vue {}
</script>

<style lang="scss">
  @import '@/assets/home.scss'
</style>
