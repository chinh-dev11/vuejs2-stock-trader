import * as types from './types';
import Vue from 'vue';

// KIM - can't declare const 'types...', requires it to be in a module, as with modules/portfolio or modules/stocks. ERROR: Parsing error: Identifier 'types' has already been declared
// KIM - how to declare a const with types.something???
// export const types.LOAD_DATA = ({ commit }) => {
// OR
export const loadData = ({ commit }) => {
// export const LOAD_DATA = ({ commit }) => {
  Vue.http.get('data.json')
    .then(response => {
			// console.log('TLC: //LOAD_DATA -> response', response);
      return response.json() // KIM - transform response to json
    })
    .then(data => {
      if (data) {
        commit(types.SET_FUNDS_PORTFOLIO, data.funds);
        commit(types.SET_STOCKS_PORTFOLIO, data.stockPortfolio ? data.stockPortfolio : []);
        commit(types.SET_STOCKS, data.stocks);
      }
    });
};
