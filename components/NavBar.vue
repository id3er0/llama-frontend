<template lang="pug">
  .sticky-bar
    template(v-if="team && teamUser")
      .owner-name-wrapper.team-owner-name-wrapper(
        v-if="teamUser.isAdmin"
        @click="show = 'TeamEdit'"
      )
        .team-logo(
          v-if="team.image"
          :style="{'background-image': `url(${team.image.url})`}"
        )
        .team-name {{team.name}}
        img(src="/images/edit.svg")
      .owner-name-wrapper.team-owner-name-wrapper(
        v-else
      )
        .team-logo(
          v-if="team.image"
          :style="{'background-image': `url(${team.image.url})`}"
        )
        .team-name {{team.name}}
    .owner-name-wrapper.team-owner-name-wrapper(v-else)
    .sticky-bar-buttons.buttons
      .button-wrapper
        button.button.button-secondary.button-white(
          tabindex="-1"
          @click="signOut"
        ) Log out
      .button-wrapper
        button.button.button-hollow(
          v-if="team"
          tabindex="-1"
          style="width: 60px;"
          @click="show = 'TeamInvite'"
        ) Invite
        button.button.button-hollow(
          v-else
          tabindex="-1"
          style="width: 60px;"
          @click="show = 'TeamEdit'"
        ) Create
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'NavBar',
    computed: {
      ...mapFields('team', [
        'team',
      ]),
      ...mapGetters('team', [
        'teamUser',
      ]),
      ...mapFields('modal', [
        'show',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'signOut'
      ]),
    },
  };
</script>
