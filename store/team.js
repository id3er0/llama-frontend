import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '~/utils/objectValue';
import trimString from '~/utils/trimString';
import { showLimit } from '~/api/posts';
import { updatesColors } from '../api/posts';

let teamSub;
let teamProfilesSub;

const STATE = immutableMap({
  date: Date.now(),
  team: null,
  teamProfiles: [],
  search: null,
  updatesOnly: false,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
  teamUser: (state, getters, rootState, rootGetters) => Array.isArray(objectValue(state, 'team.users'))
    && state.team.users.find(u => u.userId === objectValue(rootState, 'user.user.uid')),
  teamPostsGrouped: (state, getters, rootState, rootGetters) => {
    let countBlocksWithUpdates = 0;
    let groups = [];

    const currentUserId = objectValue(rootState, 'user.user.uid');
    const visitedAt = objectValue(rootState, 'user.profile.visitedAt');

    const teamUsers = objectValue(state, 'team.users', []);
    if (teamUsers.length < 1) {
      teamUsers.push({
        userId: currentUserId,
      });
    }

    const teamProfiles = [...state.teamProfiles];
    if (teamProfiles.length < 1) {
      teamProfiles.push(objectValue(rootState, 'user.profile'));
    }

    let posts = objectValue(rootState, 'posts.teamPosts') || [];
    if (state.updatesOnly) {
      posts = posts.filter(p => p.createdAt >= visitedAt);
    }

    // Process team user.
    for (const [index, u] of Object.entries(teamUsers)) {
      const isCurrent = u.userId === objectValue(rootState, 'user.user.uid');
      if (isCurrent) {
        u.isCurrent = isCurrent;
      }

      // Add user profile.
      u.profile = teamProfiles.find(p => !!p && !!u && p.userId === u.userId);

      // Add user posts.
      u.posts = posts.filter(p => p.userId === u.userId);

      if (u.posts.length > 0) {
        // Add updates indicator.
        const hasUpdates = u.posts.find(p => p.createdAt >= visitedAt);
        if (hasUpdates) {
          console.log('xxx countBlocksWithUpdates:', countBlocksWithUpdates);
          u.hasUpdates = '#' + updatesColors[countBlocksWithUpdates];
          ++countBlocksWithUpdates;
          if (countBlocksWithUpdates >= updatesColors.length) {
            countBlocksWithUpdates = 0;
          }
        }

        // Sort posts and find the last one.
        const lastPost = [...u.posts]
          .sort((a, b) => objectValue(a, 'createdAt', 0) - objectValue(b, 'createdAt', 0))
          .pop();
        u.lastPostDate = objectValue(lastPost, 'createdAt', 0);
      } else if (isCurrent) {
        // Fill with empty items.
        for (const i of [...Array(showLimit + 1)]) {
          u.posts.push({
            isEmpty: true,
            createdAt: 0,
          });
        }
      }

      groups.push(u);
    }

    // Filter with search string.
    if (state.search) {
      const search = trimString(state.search);
      groups = groups.filter(i => trimString(objectValue(i, 'profile.displayName', '')).includes(search));
    }

    // Show updates only.
    if (state.updatesOnly) {
      groups = groups.filter(i => i.hasUpdates);
    }

    // Sort groups.
    return groups.sort((a, b) => objectValue(b, 'lastPostDate', 0) - objectValue(a, 'lastPostDate', 0));
  },
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx team.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  subscribeToTeam(context) {
    console.log('xxx team.js - subscribeToTeam - run');

    // Detach previous listener.
    if (teamSub) {
      teamSub();
    }
    const teamId = objectValue(context, 'rootState.user.profile.teamsIds.0');
    if (!teamId) {
      context.dispatch('posts/subscribeToTeamPosts', null, {root: true});
      return false;
    }
    teamSub = this.$fireStore.collection('teams').doc(teamId)
      .onSnapshot(doc => {
        const team = doc && doc.data();
        console.log('xxx team.js - subscribeToTeam:', team);
        if (team) {
          team.id = teamId;
          context.commit('updateField', {path: 'team', value: team});
          context.dispatch('subscribeToTeamProfiles');
        } else {
          context.commit('loading/updateField', {path: 'firstRun', value: false}, {root: true});
        }
      });
  },
  subscribeToTeamProfiles(context) {
    console.log('xxx team.js - subscribeToTeamProfiles - run');

    // Detach previous listener.
    if (teamProfilesSub) {
      teamProfilesSub();
    }
    const teamId = objectValue(context, 'rootState.user.profile.teamsIds.0');
    if (!teamId) {
      return false;
    }
    teamProfilesSub = this.$fireStore.collection('profiles')
      .where('teamsIds', 'array-contains', teamId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        const _docs = docs.docs;

        let profiles = [];
        for (const doc of _docs) {
          const profile = doc && doc.data();
          if (profile) {
            profile.id = doc.id;
            profiles.push(profile);
          }
        }
        console.log('xxx team.js - subscribeToTeamProfiles:', profiles);
        context.commit('updateField', {path: 'teamProfiles', value: profiles});
        context.dispatch('posts/subscribeToTeamPosts', null, {root: true});
      });
  },
  async addUserToTeam(context, user) {
    console.log('xxx team.js - addUserToTeam - user:', user);

    const teamId = objectValue(context, 'state.team.id')
      || objectValue(context, 'rootState.invite.invite.teamId');
    if (!teamId) {
      console.log('xxx team.js - addUserToTeam - skip');
    }
    const teamRef = this.$fireStore.collection('teams').doc(teamId);
    try {
      await this.$fireStore.runTransaction(async transaction => {
        const doc = await transaction.get(teamRef);

        if (!doc.exists) {
          throw 'Document does not exist';
        }

        const data = doc.data();
        let users = data.users;

        if (!Array.isArray(users)) {
          users = [user];
        }

        const userAlreadyInTeam = users.find(u => u.userId === user.userId);
        console.log('xxx team.js - addUser - userAlreadyInTeam:', userAlreadyInTeam);

        if (!userAlreadyInTeam) {
          users.push(user);
        }

        transaction.update(teamRef, {users});
      });
    } catch (error) {
      console.log('xxx team.js - addUser - error:', error);
    }
  },
};
