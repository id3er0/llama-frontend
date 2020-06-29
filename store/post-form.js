import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import random from '../utils/random';
// import { debounce, throttle } from 'throttle-debounce';
// import ky from 'ky';

const STATE = immutableMap({
  date: Date.now(),
  image: null,
  preview: null,
  imageUrl: null,
  text: null,
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
  async uploadFile(context) {
    const { file } = context.state;
    if (!file) {
      console.error('xxx uploadFile - no file!');
    }
    const storageRef = this.$fireStorage.ref().child(`${random()}-${random()}/${random()}-${file.name}`);
    try {
      const snapshot = await storageRef.put(file);
      console.log('xxx uploadFile - snapshot:', snapshot);
      const url = await storageRef.getDownloadURL();
      console.log('xxx uploadFile - url:', url);
      context.commit('updateField', {path: 'imageUrl', value: url});
    } catch (error) {
      console.log('xxx uploadFile - error', error.message);
    }
  },
  async create(context) {
    // context.commit('panel/loading/setStatus', {name: 'page', value: true}, {root: true});
    const {
      imageUrl,
      text,
    } = context.state;
    const doc = {
      id: random(),
      imageUrl,
      text,
      createdAt: Date.now(),
    };
    console.log('xxx create - doc:', doc);
    const newDoc = this.$fireStore.collection('posts').doc();
    try {
      const result = await newDoc.set(doc);
      context.commit('clean');
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
      context.dispatch('posts/load', null, {root: true});
    } catch (error) {
      console.log('xxx create - error:', error);
    }
    // await sleep(1500);
    // context.commit('panel/loading/setStatus', {name: 'page', value: false}, {root: true});
  },
};
