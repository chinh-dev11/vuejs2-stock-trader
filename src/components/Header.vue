<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link
          to="/"
          class="navbar-brand"
          >
          Stock Trader
        </router-link>
        <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button> -->
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link
            to="/stocks"
            tag="li"
            active-class="active"
            >
            <a>Stocks</a>
          </router-link>
          <router-link
            to="/portfolio"
            tag="li"
            active-class="active"
            >
            <a>Portfolio</a>
          </router-link>
        </ul>
        <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a
              href="#"
              @click="endDay"
              >End Day</a>
          </li>
          <li
            class="dropdown"
            :class="{open: isDropdownOpen}"
            @click="isDropdownOpen = !isDropdownOpen"
            >
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >Save & Load <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li>
                <a
                  href="#"
                  @click="saveData"
                  >Save Data</a>
              </li>
              <li>
                <a
                  href="#"
                  @click="loadData"
                  >Load Data</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import * as types from '../store/types';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      isDropdownOpen: false
    };
  },
  computed: {
    funds () {
      return this.$store.getters[types.GET_FUNDS_PORTFOLIO];
    }
  },
  methods: {
    // ...mapActions([types.RANDOMIZE_STOCKS, 'loadData']),
    // ...mapActions([types.RANDOMIZE_STOCKS, 'LOAD_DATA']),
    // KIM - map actions with namespacing
    ...mapActions(
      {
        randomizeStocks: types.RANDOMIZE_STOCKS,
        // fetchData: types.LOAD_DATA
        // fetchData: 'LOAD_DATA'
        fetchData: 'loadData'
      }
    ),
    endDay () {
      // this[types.RANDOMIZE_STOCKS]();
      this.randomizeStocks();
    },
    saveData () {
      const data = {
        funds: this.$store.getters[types.GET_FUNDS_PORTFOLIO],
        stockPortfolio: this.$store.getters[types.GET_STOCKS_PORTFOLIO],
        stocks: this.$store.getters[types.GET_STOCKS]
      };

      this.$http.put('data.json', data);
      /* .then(
          response => {
            console.log('response: ', response);
          },
          error => {
            console.log('error: ', error);
          }
        ); */
    },
    loadData () {
      /* KIM -
      - an action required and not mutation since it's async task
      - requires using namespacing (mapping actions with a function name - see mapActions above) to prevent an infinite function call loop, in case the action also named 'loadData': [Vue warn]: Error in v-on handler: "RangeError: Maximum call stack size exceeded"
       */
      // this.loadData();
      this.fetchData();
    }
  }
};
</script>

<style>
/* bootstrap breakpoint md: 768 */
@media screen and (max-width: 768px) {
  .collapse {
    display: block;
  }
}
</style>
