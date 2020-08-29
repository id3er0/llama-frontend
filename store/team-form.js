import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import random from '~/utils/random';
import objectValue from '~/utils/objectValue';

const STATE = immutableMap({
  date: Date.now(),
  name: null,
  image: null,
  preview: null,
  image: {
    bucket: null,
    fullPath: null,
    name: null,
    url: null,
  },
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx team-form.js - clean');
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
      console.error('xxx team-form.js - uploadFile - no file!');
    }
    context.commit('updateField', {path: 'preview', value: URL.createObjectURL(file)});
    context.commit('loading/setStatus', {name: 'team-image-upload', value: true}, {root: true});
    const fileNameExt = file.name.split('.').pop().toLowerCase();
    const filePath = `teams/${random()}-${random()}.${fileNameExt}`;
    const storageRef = this.$fireStorage.ref().child(filePath);
    const metadata = {
      cacheControl: `public, max-age=${7 * 24 * 60 * 60}, s-maxage=${7 * 24 * 60 * 60}`,
    };
    try {
      const snapshot = await storageRef.put(file, metadata);
      console.log('xxx team-form.js - uploadFile - snapshot:', snapshot);
      const url = await storageRef.getDownloadURL();
      console.log('xxx team-form.js - uploadFile - url:', url);
      context.commit('updateField', {
        path: 'image', value: {
          bucket: objectValue(snapshot, 'metadata.bucket'),
          fullPath: objectValue(snapshot, 'metadata.fullPath'),
          name: objectValue(snapshot, 'metadata.name'),
          url,
        },
      });
    } catch (error) {
      console.log('xxx team-form.js - uploadFile - error', error.message);
    }
    context.commit('loading/setStatus', {name: 'team-image-upload', value: false}, {root: true});
  },
  async create(context) {
    context.commit('loading/setStatus', {name: 'team-new', value: true}, {root: true});
    const {
      name,
      image,
    } = context.state;
    const userId = objectValue(context, 'rootState.user.user.uid');
    const displayName = objectValue(context, 'rootState.user.profile.displayName');
    const inviteId = random();
    const doc = {
      name,
      image,
      inviteId,
      createdAt: Date.now(),
      users: [{
        userId,
        isAdmin: true,
        isAuthor: true,
        addedAt: Date.now(),
      }],
    };
    console.log('xxx team-form.js - create - doc:', doc);
    const teamsCollection = this.$fireStore.collection('teams');
    try {
      const team = await teamsCollection.add(doc);
      console.log('xxx team-form.js - create - added:', team);
      const teamId = team.id;

      // Add invite object.
      await this.$fireStore.collection('invites').doc(inviteId)
        .set({
          teamId,
          teamName: name,
          userName: displayName,
        });

      // Assign to team.
      await context.dispatch('user/addToTeam', {teamId}, {root: true});

      // Clean form.
      context.commit('clean');

      // Close modal.
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
    } catch (error) {
      console.log('xxx team-form.js - create - error:', error);
    }
    context.commit('loading/setStatus', {name: 'team-new', value: false}, {root: true});
  },
  async update(context) {
    context.commit('loading/setStatus', {name: 'team-update', value: true}, {root: true});
    const {
      name,
      image,
    } = context.state;
    const userId = objectValue(context, 'rootState.user.user.uid');
    const doc = {
      name,
      image,
      updatedAt: Date.now(),
    };
    console.log('xxx team-form.js - update - doc:', doc);
    const teamsCollection = this.$fireStore.collection('teams');
    try {
      const team = objectValue(context, 'rootState.team.team');
      console.log('xxx team-form.js - update - team:', team);
      console.log('xxx team-form.js - update - team.id:', team.id);
      const teamRef = await teamsCollection.doc(team.id);
      await teamRef.update(doc);
      // Close modal.
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
    } catch (error) {
      console.log('xxx team-form.js - update - error:', error);
    }
    context.commit('loading/setStatus', {name: 'team-update', value: false}, {root: true});
  },
};
