<template>
  <div class="confirmation">
    <h3>Do you want to delete item?</h3>
    <div class="group-btn">
      <button @click="$emit('deleteItem')">Confirmation</button>
      <button @click="$emit('modalClose')">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Confirmation extends Vue {}
</script>

<style scoped lang="scss">
  .confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .group-btn {
      margin-top: 20px;
      button {
        width: 150px;
        height: 30px;
        margin: 0 5px;
      }
    }
  }
</style>
