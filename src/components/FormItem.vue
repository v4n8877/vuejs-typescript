<template slot-scope='props'>
  <div class="container-form">
    <h3 slot="header">Modify item</h3>
    <div class="modal_content">
      <img :src="choiceParentItem.avatar" />
      <div class="group-item">
        <label>Name</label>
        <input name="name" v-model="choiceParentItem.name" />
      </div>
      <div class="group-item">
        <label>Price</label>
        <input name="price" v-model="choiceParentItem.price" />
      </div>
    </div>

    <div class="group-btn">
      <button @click="$emit('editItem')">Confirm</button>
      <button @click="$emit('modalClose')">Cancel</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['choiceParentItem']
})
export default class FormItem extends Vue {

  // edit() {
  //   this.$emit('edit');
  // }

  // modal() {
  //   this.$emit('modal');
  // }
}
</script>

<style lang="scss">
  @import '@/assets/formItem.scss';
</style>