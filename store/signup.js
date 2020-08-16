import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import isEmail from '../utils/isEmail';
// import { debounce, throttle } from 'throttle-debounce';
// import ky from 'ky';

const STATE = immutableMap({
  date: Date.now(),
  authorized: false,
  payload: {
    name: null,
    email: null,
    password: null,
  },
  errors: {
    nameError: null,
    emailError: null,
    passwordError: null,
  },
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  hasErrors: state => Object.values(state.errors).filter(value => !!value).length > 0,
  isEmail: state => isEmail(state.payload.email),
  isDisabled: (state, getters) =>
    getters.hasErrors
    || !state.payload.name
    || !getters.isEmail
    || !state.payload.password,
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
  async createUser(context) {
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      await this.$fireAuth.createUserWithEmailAndPassword(
        context.state.payload.email,
        context.state.payload.password,
      );
      const user = await this.$fireAuth.currentUser;
      await user.updateProfile({
        displayName: context.state.payload.name,
      });
    } catch (error) {
      console.warn('xxx createUser - error:', error);

      switch (error.code) {
        case 'auth/weak-password':
          context.commit('updateField', {path: 'errors.passwordError', value: {message: error.message}});
          break;
        case 'auth/email-already-in-use':
          context.commit('updateField', {path: 'errors.emailError', value: {message: error.message}});
          break;
        default:
          context.commit('updateField', {path: 'errors.emailError', value: {message: error.message}});
          break;
      }
    }
  },
};
