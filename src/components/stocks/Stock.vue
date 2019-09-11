<template>
  <div class="col-sm-6 col-md-4">
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
            :disabled="quantity <= 0 || !Number.isInteger(quantity)"
            @click="buyStock"
            >
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    buyStock () {
      const order = {
        stockName: this.stock.name,
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      console.log('order: ', order);
    }
  }
};
</script>

<style>

</style>
