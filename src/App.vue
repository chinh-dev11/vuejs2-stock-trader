<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import * as types from './store/types';

export default {
  components: {
    appHeader: Header
  },
  created () {
    this.$store.dispatch(types.INIT_STOCKS);
  }
};
</script>

<style>
body {
    padding: 30px;
}
</style>
