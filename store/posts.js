import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import sleep from '~/utils/sleep';

const STATE = immutableMap({
  date: Date.now(),
  items: null,
  selectedId: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  selectedItem: state => Array.isArray(state.items) && state.items.find(i => i.id === state.selectedId),
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
  async load(context) {
    // context.commit('panel/loading/setStatus', {name: 'page', value: true}, {root: true});
    const collection = this.$fireStore.collection('posts');
    try {
      const result = await collection.get();
      // console.log('xxx load - result:', result);
      const items = result.docs.map(i => i.data());
      console.log('xxx load - items:', items);
      context.commit('updateField', {path: 'items', value: items});
    } catch (error) {
      console.log('xxx load - error:', error);
    }
    await sleep(1500);
    // context.commit('panel/loading/setStatus', {name: 'page', value: false}, {root: true});
  },
  async show(context, payload) {
    context.commit('updateField', {path: 'selectedId', value: payload});
    context.commit('modal/updateField', {path: 'show', value: 'Post'}, {root: true});
  },
};
