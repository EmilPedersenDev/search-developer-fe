import { SET_DEVELOPER_EXPERIENCE, GET_DEVELOPER_EXPERIENCE, DELETE_DEVELOPER_EXPERIENCE } from '../actions/experience-actions';
import api from '../../api/index';
const state = {
  selectedExperiences: []
};

const actions = {
  [SET_DEVELOPER_EXPERIENCE]: ({ commit }, payload) => {
    api.post(`developer/${payload.id}/experience`, payload.experience).then((result) => {
      commit(SET_DEVELOPER_EXPERIENCE, result.data.updatedDeveloper.experience);
    });
  },
  [DELETE_DEVELOPER_EXPERIENCE]: ({ commit }, payload) => {
    api.delete(`developer/${payload.userId}/experience/${payload.id}`).then((result) => {
      commit(SET_DEVELOPER_EXPERIENCE, result.data.updatedExperience);
    });
  }
};

const mutations = {
  [SET_DEVELOPER_EXPERIENCE]: (state, payload) => {
    let developerExperience = payload.map((experience) => {
      experience.date = new Date(experience.date).getFullYear();
      return experience;
    });
    state.selectedExperiences = developerExperience;
  }
};

const getters = {
  [GET_DEVELOPER_EXPERIENCE]: (state) => {
    return state.selectedExperiences;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
