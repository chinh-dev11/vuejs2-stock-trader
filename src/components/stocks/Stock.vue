<template>
  <div class="col-sm-6">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }} <span class="small">(Price: {{ stock.price }})</span>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            v-model.number="quantity"
            type="number"
            class="form-control"
            placeholder="Quantity"
            :class="{danger: insufficientFunds}"
            />
        </div>
        <div class="pull-right">
          <!--
                KIM -
                Input value (quantity) is by default of type String.
                Required VueJS number modifier (v-model.number="quantity") for validating 'quantity' isInteger (!Number.isInteger(quantity)).
            -->
          <button
            class="btn btn-success"
            type="button"
            :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)"
            @click="buyStock"
            >
            {{ insufficientFunds ? 'Short Funds' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../store/types';

export default {
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      quantity: 0
    };
  },
  computed: {
    funds () {
      return this.$store.getters[types.GET_FUNDS];
    },
    insufficientFunds () {
      return this.funds < this.quantity * this.stock.price;
    }
  },
  methods: {
    buyStock () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };

      this.$store.dispatch(types.BUY_STOCKS, order);

      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
