<template>
  <div class="col-sm-6">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }} <span class="small">(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</span>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            v-model.number="quantity"
            type="number"
            class="form-control"
            placeholder="Quantity"
            :class="{danger: insufficientQuantity}"
            />
        </div>
        <div class="pull-right">
          <!--
                KIM -
                Input value (quantity) is by default of type String.
                Required VueJS number modifier (v-model.number="quantity") for validating 'quantity' isInteger (!Number.isInteger(quantity)).
            -->
          <button
            class="btn btn-danger"
            type="button"
            :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)"
            @click="sellStock"
            >
            {{ insufficientQuantity ? 'Short Stocks' : 'Sell' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../store/types';
import { mapActions } from 'vuex';

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
    insufficientQuantity () {
      return this.stock.quantity < this.quantity;
    }
  },
  methods: {
    /* ...mapActions([
      types.SELLING_STOCK
    ]), */
    // KIM - OR can be mapped to a name (eg: 'sellingStock')
    ...mapActions({
      // KIM - CAUTION: not to map to the same name (eg: sellStock) as the method below. It will fail due to a function (sellStock) call loop with the error: Maximum call stck size exceed...
      sellingStock: types.SELLING_STOCK
    }),
    sellStock () {
      const order = {
        stockId: this.stock.id,
        quantity: this.quantity,
        stockPrice: this.stock.price
      };

      // this.$store.dispatch(types.SELLING_STOCK, order);
      // KIM - OR using mapActions
      // this[types.SELLING_STOCK](order);
      // KIM - OR calling the mapped name instead
      this.sellingStock(order);

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
