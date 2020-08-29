import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import random from '~/utils/random';
import objectValue from '~/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  id: null,
  preview: null,
  image: {
    bucket: null,
    fullPath: null,
    name: null,
    url: null,
  },
  text: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx post-form.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async uploadFile(context, files) {
    const file = objectValue(files, '0');
    if (!file) {
      console.error('xxx post-form.js - uploadFile - no file!');
    }
    context.commit('updateField', {path: 'preview', value: URL.createObjectURL(file)});
    context.commit('loading/setStatus', {name: 'post-image-upload', value: true}, {root: true});
    const fileNameExt = file.name.split('.').pop().toLowerCase();
    const filePath = `posts/${random()}-${random()}.${fileNameExt}`;
    const storageRef = this.$fireStorage.ref().child(filePath);
    const metadata = {
      cacheControl: `public, max-age=${7 * 24 * 60 * 60}, s-maxage=${7 * 24 * 60 * 60}`,
    };
    try {
      const snapshot = await storageRef.put(file, metadata);
      console.log('xxx post-form.js - uploadFile - snapshot:', snapshot);
      const url = await storageRef.getDownloadURL();
      console.log('xxx post-form.js - uploadFile - url:', url);
      context.commit('updateField', {
        path: 'image', value: {
          bucket: objectValue(snapshot, 'metadata.bucket'),
          fullPath: objectValue(snapshot, 'metadata.fullPath'),
          name: objectValue(snapshot, 'metadata.name'),
          url,
        },
      });
    } catch (error) {
      console.log('xxx post-form.js - uploadFile - error', error.message);
    }
    context.commit('loading/setStatus', {name: 'post-image-upload', value: false}, {root: true});
  },
  async submitPostForm(context) {
    if (context.state.id) {
      context.dispatch('update');
    } else {
      context.dispatch('create');
    }
  },
  async create(context) {
    context.commit('loading/setStatus', {name: 'create-post', value: true}, {root: true});
    const {
      image,
      text,
    } = context.state;
    const doc = {
      image,
      text,
      userId: objectValue(context, 'rootState.user.user.uid'),
      teamId: objectValue(context, 'rootState.team.team.id', null),
      createdAt: Date.now(),
    };
    console.log('xxx post-form.js - create - doc:', doc);
    const collection = this.$fireStore.collection('posts');
    try {
      const result = await collection.add(doc);
      context.commit('clean');
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
    } catch (error) {
      console.log('xxx post-form.js - create - error:', error);
    }
    // await sleep(1500);
    context.commit('loading/setStatus', {name: 'create-post', value: false}, {root: true});
  },
  async update(context) {
    context.commit('loading/setStatus', {name: 'create-post', value: true}, {root: true});
    const ref = this.$fireStore.collection('posts').doc(context.state.id);
    try {
      const result = await ref.update({
        text: context.state.text,
      });
      context.commit('clean');
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
    } catch (error) {
      console.log('xxx post-form.js - create - error:', error);
    }
    context.commit('loading/setStatus', {name: 'create-post', value: false}, {root: true});
  },
};
