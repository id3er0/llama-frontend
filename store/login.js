import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import isEmail from '../utils/isEmail';
import objectValue from '../utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  payload: {
    email: null,
    password: null,
  },
  errors: {
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
    || !getters.isEmail
    || !state.payload.password,
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx login.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async emailPassword(context) {
    context.commit('loading/setStatus', {name: 'email-password', value: true}, {root: true});
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      await this.$fireAuth.sendPasswordResetEmail(context.state.payload.email);
      context.commit('modal/updateField', {path: 'show', value: 'PasswordResetEmailSent'}, {root: true});
    } catch (error) {
      console.warn('xxx login.js - emailPassword - error:', error);
      context.commit('updateField', {path: 'errors.emailError', value: {message: error.message}});
    }
    context.commit('loading/setStatus', {name: 'email-password', value: false}, {root: true});
  },
  async signIn(context) {
    context.commit('loading/setStatus', {name: 'signin', value: true}, {root: true});
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    // await context.dispatch('user/signOut', null, {root: true});
    try {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        context.state.payload.email,
        context.state.payload.password,
      );
      console.log('xxx login.js - signIn - user:', user);
      context.commit('updateField', {path: 'payload', value: STATE.toJS().payload});
      this.$router.push('/');
    } catch (error) {
      console.warn('xxx login.js - signin - error:', error);

      switch (error.code) {
        case 'auth/wrong-password':
          context.commit('updateField', {path: 'errors.passwordError', value: {message: error.message}});
          break;
        default:
          context.commit('updateField', {path: 'errors.passwordError', value: {message: error.message}});
          break;
      }
    }
    context.commit('loading/setStatus', {name: 'signin', value: false}, {root: true});
  },
};
