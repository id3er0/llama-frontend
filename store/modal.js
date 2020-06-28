import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';

const STATE = immutableMap({
  date: Date.now(),
  show: false,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {};
