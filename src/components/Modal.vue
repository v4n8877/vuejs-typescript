<template>
  <transition name="modal">
    <div class="modal-mask" @close='close' v-show="show">
      <div class="modal-container">
        <slot name="content"/>
      </div>
    </div>
  </transition>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Modal extends Vue {
  show = false;

  close() {
    this.$emit('close');
  }

}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    overflow-x: auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}
.modal-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 30%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
.modal-body {
    margin: 20px 0;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>