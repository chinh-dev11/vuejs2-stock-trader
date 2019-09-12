<template>
  <div>
    <h1>Trade or View your Portfolio</h1>
    <h6>You may Save & Load your Data</h6>
    <h6>Click on 'End Day' to begin a New Day!</h6>
    <hr>
    <p>Your Fund: {{ funds | currency }}</p>
  </div>
</template>

<script>
import * as types from '../store/types';

export default {
  computed: {
    funds () {
      return this.$store.getters[types.GET_FUNDS];
    }
  }
};
</script>

<style>

</style>
