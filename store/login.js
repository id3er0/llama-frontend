import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import isEmail from '../utils/isEmail';

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
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async emailPassword(context) {
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      await this.$fireAuth.sendPasswordResetEmail(context.state.payload.email);
    } catch (error) {
      console.warn('xxx emailPassword - error:', error);
      context.commit('updateField', {path: 'errors.emailError', value: {message: error.message}});
    }
  },
  async signIn(context) {
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        context.state.payload.email,
        context.state.payload.password,
      );
      context.commit('updateField', {path: 'payload', value: STATE.toJS().payload});
      this.$router.push('/');
    } catch (error) {
      console.warn('xxx signin - error:', error);

      switch (error.code) {
        case 'auth/wrong-password':
          context.commit('updateField', {path: 'errors.passwordError', value: {message: error.message}});
          break;
        default:
          context.commit('updateField', {path: 'errors.passwordError', value: {message: error.message}});
          break;
      }
    }
  },
};
