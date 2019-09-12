<template>
  <div>
    <app-stock
      v-for="stock in stocks"
      :key="stock.id"
      :stock="stock"
      ></app-stock>
  </div>
</template>

<script>
import Stock from './Stock.vue';
import { mapGetters } from 'vuex';
import * as types from '../../store/types';

export default {
  components: {
    appStock: Stock
  },
  computed: {
    /* ...mapGetters([
      types.GET_PORTFOLIO
    ]), */
    /* stocks () {
      // return this.$store.getters[types.GET_PORTFOLIO];
      // KIM - OR using mapGetter
      return this[types.GET_PORTFOLIO]();
    } */
    // KIM - OR can be mapped to a name (eg: stocks)
    ...mapGetters({
      stocks: types.GET_PORTFOLIO
    })
  }
};
</script>

<style>

</style>
