import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
// import { debounce, throttle } from 'throttle-debounce';
// import ky from 'ky';

const STATE = immutableMap({
  date: Date.now(),
  user: {
    displayName: null,
    email: null,
    uuid: null,
  },
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

export const actions = {
  subscribeToUser(context) {
    this.$fireAuth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('xxx subscribeToUser - onAuthStateChanged - user:', user);
        const {
          displayName,
          email,
          uid,
        } = user;
        context.commit('updateField', {
          path: 'user',
          value: {
            displayName,
            email,
            uid,
          },
        });
      } else {
        console.log('xxx subscribeToUser - onAuthStateChanged - no user');
        context.commit('updateField', {path: 'user', value: STATE.toJS().user});
      }
    });
  },
  async signOut() {
    try {
      await this.$fireAuth.signOut();
    } catch (error) {
      console.warn('xxx signOut - error:', error);
    }
  }
};
