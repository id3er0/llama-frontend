import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import objectValue from '~/utils/objectValue';
import trimString from '~/utils/trimString';

const STATE = immutableMap({
  date: Date.now(),
  inviteId: null,
  invite: null,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    console.log('xxx invite.js - clean');
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  async fetchInvite(context) {
    const inviteId = context.state.inviteId;
    if (!inviteId) {
      return false;
    }
    try {
      const invite = (await this.$fireStore.collection('invites').doc(inviteId).get()).data();
      if (invite) {
        console.log('xxx invite.js - fetchInvite:', invite);
        context.commit('updateField', {path: 'invite', value: invite});
      }
    } catch (error) {
      console.log('xxx invite.js - fetchInvite - error:', error);
    }
  },
};
