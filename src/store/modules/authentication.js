import { LOGIN, SET_TOKEN, IS_AUTHENTICATED, LOGOUT } from '../actions/authentication-actions';
import { SET_USER } from '../actions/user-actions';
import { GET_DEVELOPER } from '../actions/developer-actions';
import api from '../../api/index';
const state = {
  token: localStorage.getItem('jwt') || ''
};

const actions = {
  [LOGIN]: ({ commit, getters, dispatch }, loginModel) => {
    return api
      .post('auth/signin', loginModel)
      .then((result) => {
        commit(SET_USER, result.data);
        commit(SET_TOKEN, result.data.accessToken);

        return Promise.resolve(dispatch(GET_DEVELOPER, result.data.id))
          .then(() => {
            return result.data;
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  },
  [LOGOUT]: async ({ commit }) => {
    await localStorage.removeItem('jwt');
    commit(SET_TOKEN, '');
    commit(SET_USER, {});
  }
};

const mutations = {
  [SET_TOKEN]: async (state, payload) => {
    if (payload) {
      await localStorage.setItem('jwt', payload);
    }
    state.token = payload;
  }
};

const getters = {
  [IS_AUTHENTICATED]: (state) => {
    return !!state.token;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
