<template>
    <div class="alert alert-danger" v-if="meta && Object.keys(meta).length">
        <ul>
            <li v-if="message in meta">{{ message }}</li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['meta']
})
export default class Notifications extends Vue {}
</script>