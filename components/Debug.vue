<template lang="pug">
  .debug
    small
      div Debug:
      pre
        | currentUser: {{displayName}}
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
    computed: {
      ...mapFields('user', [
        'user.displayName',
      ]),
      ...mapGetters('team', [
        'teamUser',
      ]),
    },
  };
</script>
