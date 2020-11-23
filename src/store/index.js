import Vue from 'vue';
import Vuex from 'vuex';

// modules
import authentication from './modules/authentication';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    user
  }
});
