<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <!-- <transition
          name="fade"
          mode="out-in"
          > -->
        <transition
          name="slide"
          mode="out-in"
          >
          <router-view></router-view>
        </transition>
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

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 200ms;
}
/* .fade-leave {} */
.fade-leave-active {
  transition: opacity 200ms;
  opacity: 0;
}

.slide-enter-active {
animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active {
animation: slide-out 200ms ease-out forwards;

}
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
