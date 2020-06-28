import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
// import { debounce, throttle } from 'throttle-debounce';
// import ky from 'ky';
import objectValue from '~/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  authorized: true,
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
