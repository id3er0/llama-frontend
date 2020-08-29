import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import sleep from '~/utils/sleep';
import objectValue from '../utils/objectValue';

let profileSub;

const STATE = immutableMap({
  date: Date.now(),
  user: {
    displayName: null,
    email: null,
    uid: null,
  },
  profile: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx user.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async subscribeToUser(context) {
    const $vm = this;
    context.commit('loading/setStatus', {name: 'subscribe-to-user', value: true}, {root: true});

    this.$fireAuth.onAuthStateChanged(async function (user) {
      if (user) {
        console.log('xxx user.js - subscribeToUser - onAuthStateChanged - user:', user);
        const {
          displayName,
          email,
          uid,
        } = user;
        // Set user data.
        context.commit('updateField', {
          path: 'user',
          value: {
            displayName,
            email,
            uid,
          },
        });
        // Assign to team.
        await context.dispatch('addToTeam', {});
        // Save visited time.
        await context.dispatch('updateProfile', {visitedAt: Date.now()});
        // Subscribe to profile.
        context.dispatch('subscribeToProfile');
      } else {
        console.log('xxx user.js - subscribeToUser - onAuthStateChanged - no user');
        context.commit('updateField', {path: 'user', value: STATE.toJS().user});
        context.commit('loading/updateField', {path: 'firstRun', value: false}, {root: true});
      }
      context.commit('loading/setStatus', {name: 'subscribe-to-user', value: false}, {root: true});
    });
  },
  subscribeToProfile(context) {
    // Detach previous listener.
    if (profileSub) {
      profileSub();
    }
    const userId = context.state.user.uid;
    if (!userId) {
      context.commit('loading/updateField', {path: 'firstRun', value: false}, {root: true});
      return false;
    }
    profileSub = this.$fireStore.collection('profiles').doc(userId)
      .onSnapshot(doc => {
        const profile = doc && doc.data();
        if (profile) {
          profile.id = doc.id;
        }
        console.log('xxx user.js - subscribeToProfile:', profile);
        context.commit('updateField', {path: 'profile', value: profile});
        context.dispatch('team/subscribeToTeam', null, {root: true});
      });
  },
  async signOut(context) {
    console.log('xxx user.js - signOut - run');
    try {
      await this.$fireAuth.signOut();
      context.commit('invite/clean', null, {root: true});
      context.commit('login/clean', null, {root: true});
      context.commit('modal/clean', null, {root: true});
      context.commit('post-form/clean', null, {root: true});
      context.commit('posts/clean', null, {root: true});
      context.commit('signup/clean', null, {root: true});
      context.commit('team/clean', null, {root: true});
      context.commit('team-form/clean', null, {root: true});
      context.commit('user/clean', null, {root: true});
    } catch (error) {
      console.warn('xxx user.js - signOut - error:', error);
    }
  },
  async createProfile(context, doc) {
    console.log('xxx user.js - createProfile - doc:', doc);

    // Store user profile in collection because there is no way to access users list with `auth()`.
    const user = await this.$fireAuth.currentUser;
    const {
      uid,
      email,
    } = user;
    const displayName = doc.displayName
      || objectValue(context, 'rootState.user.user.displayName');
    try {
      const teamId = objectValue(context, 'rootState.team.team.id')
        || objectValue(context, 'rootState.invite.teamId')
        || null;
      await this.$fireStore.collection('profiles')
        .doc(uid)
        .set({
          userId: uid,
          email,
          displayName,
          teamsIds: teamId ? [teamId] : [],
          createdAt: Date.now(),
        });
    } catch (error) {
      console.log('xxx user.js - signup - create profile - error:', error);
    }
  },
  async updateName(context) {
    console.log('xxx user.js - updateName - run');

    context.commit('loading/setStatus', {name: 'update-profile', value: true}, {root: true});
    context.commit('updateField', {path: 'errors', value: STATE.toJS().errors});
    try {
      const user = await this.$fireAuth.currentUser;
      const displayName = context.state.user.displayName;
      const userId = context.state.user.uid;
      await user.updateProfile({
        displayName,
      });
      await context.dispatch('updateProfile', {displayName});
      context.commit('modal/updateField', {path: 'show', value: null}, {root: true});
    } catch (error) {
      console.warn('xxx user.js - updateName - error:', error);
    }
    context.commit('loading/setStatus', {name: 'update-profile', value: false}, {root: true});
  },
  async updateProfile(context, doc) {
    console.log('xxx user.js - updateProfile - doc:', doc);

    // Store user profile in collection
    // because there is no way to access users list with `auth()` without server.
    const userId = context.state.user.uid;
    const profileRef = this.$fireStore.collection('profiles').doc(userId);

    if ((await profileRef.get()).exists) {
      try {
        const result = await profileRef.update(doc);
      } catch (error) {
        console.log('xxx user.js - updateProfile - create profile - error:', error);
      }
    } else {
      context.dispatch('createProfile', doc);
    }
  },
  async addToTeam(context, {teamId}) {
    console.log('xxx user.js - addToTeam - run');

    teamId = teamId || objectValue(context, 'rootState.invite.invite.teamId');
    console.log('xxx user.js - addToTeam - objectValue(context, \'rootState.invite.invite.teamId\'):', objectValue(context, 'rootState.invite.invite.teamId'));
    if (!teamId) {
      console.log('xxx user.js - addToTeam - skip');
      return false;
    }

    // Add teamId for profile.
    await context.dispatch('updateProfile', {teamsIds: [teamId]});

    // Add teamId for posts.
    await context.dispatch('posts/addTeamId', {teamId}, {root: true});

    // Add user to team.
    const userId = objectValue(context, 'state.user.uid');
    const userDoc = {
      userId,
      addedAt: Date.now(),
    };
    await context.dispatch('team/addUserToTeam', userDoc, {root: true});

    // Clean up.
    context.commit('invite/clean', null, {root: true});

    console.log('xxx user.js - addToTeam - done');
  },
};
