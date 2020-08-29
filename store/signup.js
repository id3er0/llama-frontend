import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import isEmail from '../utils/isEmail';
import objectValue from '../utils/objectValue';
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
    console.log('xxx signup.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async createUser(context) {
    console.log('xxx signup.js - createUser - run');
    context.commit('loading/setStatus', {name: 'create-user', value: true}, {root: true});
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      await this.$fireAuth.createUserWithEmailAndPassword(
        context.state.payload.email,
        context.state.payload.password,
      );
      const displayName = context.state.payload.name;
      const user = await this.$fireAuth.currentUser;
      console.log('xxx signup.js - createUser - user:', user);
      await user.updateProfile({displayName});
      await context.dispatch('user/createProfile', {displayName}, {root: true});
      this.$router.push('/');
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
    context.commit('loading/setStatus', {name: 'create-user', value: false}, {root: true});
  },
};
