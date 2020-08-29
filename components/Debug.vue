<template lang="pug">
  .debug
    small
      div Debug:
      pre
        | version: {{version}}
        | -------
        | currentUser: {{displayName}}
        | -------
        |
        template(v-if="teamUser")
          | isTeamAuthor: {{!!teamUser.isAuthor}}
          | isTeamAdmin: {{!!teamUser.isAdmin}}
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Debug',
    created() {
      console.log('xxx project version:', this.version);
    },
    computed: {
      ...mapFields('user', [
        'user.displayName',
      ]),
      ...mapGetters('team', [
        'teamUser',
      ]),
      version() {
        return process.env.NUXT_PACKAGE_VERSION;
      },
    },
  };
</script>
