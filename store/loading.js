import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';

const STATE = immutableMap({
  date: Date.now(),
  firstRun: true,
  loading: {},
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  isLoading: state => Object.values(state.loading).filter(i => i === true).length > 0,
};

export const mutations = {
  updateField,
  clean(state) {
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
  setStatus(state, {name, value}) {
    const save = immutableMap(state.loading).toJS();
    state.loading = {
      ...save,
      [name]: value,
    }
  },
};

export const actions = {};
