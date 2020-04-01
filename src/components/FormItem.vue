<template>
  <div class="container-form">
    <h3 slot="header">Modify item</h3>
    <div class="modal_content">
      <div class="group-img">
        <img :src="choiceParentItem.link" />
        <input type="file" name="file" id="file" class="inputfile" @change="onFileChange"/>
        <label for="file">Choose a file</label>
      </div>
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

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['choiceParentItem'],
})
export default class FormItem extends Vue {
  onFileChange($event: any) {
    const files = $event.target.files || $event.dataTransfer.files;
    this.$emit('changeFile', files);
  }
}
</script>

<style lang="scss">
  @import '@/assets/formItem.scss';
</style>
