import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '~/utils/objectValue';

let teamPostsSub;

const STATE = immutableMap({
  date: Date.now(),
  teamPosts: null,
  selectedId: null,
  selectedIdToRemove: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  selectedItem: (state, getters, rootState, rootGetters) => {
    const post = Array.isArray(rootState.posts.teamPosts) && rootState.posts.teamPosts.find(i => i.id === state.selectedId);
    if (!post) {
      return false;
    }
    post.isEditable = post.userId === objectValue(rootState, 'user.user.uid');
    return post;
  },
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx posts.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  subscribeToTeamPosts(context) {
    // Detach previous listener.
    if (teamPostsSub) {
      teamPostsSub();
    }
    const teamId = objectValue(context, 'rootState.user.profile.teamsIds.0');
    const userId = context.rootState.user.user.uid;

    console.log('xxx posts.js - subscribeToTeamPosts - teamId:', teamId);

    const collectionRef = teamId
      ? this.$fireStore.collection('posts')
        .where('teamId', '==', teamId)
        .orderBy('createdAt', 'desc')
      : this.$fireStore.collection('posts')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc');
    teamPostsSub = collectionRef
      .onSnapshot(snapshot => {
        const docs = snapshot.docs;

        let posts = [];
        for (const doc of docs) {
          const profile = doc && doc.data();
          if (profile) {
            profile.id = doc.id;
            posts.push(profile);
          }
        }
        console.log('xxx posts.js - subscribeToTeamPosts:', posts);
        context.commit('updateField', {path: 'teamPosts', value: posts});
        context.commit('updateField', {path: 'date', value: Date.now()});
        context.commit('loading/updateField', {path: 'firstRun', value: false}, {root: true});
      });
  },
  async showPost(context, post) {
    console.log('xxx posts.js - showPost - post:', post);

    if (post.isEditable) {
      await context.commit('post-form/updateField', {path: 'text', value: post.text}, {root: true});
      await context.commit('post-form/updateField', {path: 'preview', value: post.image.url}, {root: true});
      await context.commit('post-form/updateField', {path: 'image', value: post.image}, {root: true});
      await context.commit('post-form/updateField', {path: 'id', value: post.id}, {root: true});
    }

    context.commit('updateField', {path: 'selectedId', value: post.id});
    context.commit('modal/updateField', {path: 'show', value: 'Post'}, {root: true});
  },
  removePostModal(context, payload) {
    context.commit('updateField', {path: 'selectedIdToRemove', value: payload});
    context.commit('modal/updateField', {path: 'show', value: 'PostRemove'}, {root: true});
  },
  closePostModal(context) {
    context.commit('updateField', {path: 'selectedIdToRemove', value: null});
    context.commit('modal/updateField', {path: 'show', value: false}, {root: true});
  },
  async removePost(context) {
    const id = context.state.selectedIdToRemove;
    if (!id) {
      return false;
    }
    try {
      await this.$fireStore.collection('posts').doc(id)
        .delete();
    } catch (error) {
      console.log('xxx posts.js - removePost - error:', error);
    }
    context.commit('updateField', {path: 'selectedIdToRemove', value: null});
    context.commit('modal/updateField', {path: 'show', value: false}, {root: true});
  },
  async addTeamId(context, {teamId}) {
    console.log('xxx posts.js - addTeamId - teamId:', teamId);

    const userId = objectValue(context, 'rootState.user.user.uid');
    const collection = this.$fireStore.collection('posts');

    try {
      // const docs = await collection
      //   .where('userId', '==', userId)
      //   .where('teamId', '==', null)
      //   .get();
      // const _docs = docs.docs;
      // if (Array.isArray(_docs)) {
      //   for (const doc of _docs) {
      //     await collection.doc(doc.id)
      //       .update({teamId});
      //   }
      // }

      const response = await collection
        .where('userId', '==', userId)
        .where('teamId', '==', null)
        .get();

      let batch = this.$fireStore.batch();
      response.docs.forEach(doc => {
        const docRef = collection.doc(doc.id);
        batch.update(docRef, {teamId});
      });
      await batch.commit();
    } catch (error) {
      console.log('xxx posts.js - addTeamId - error:', error);
    }
  },
};
