<template lang="pug">
  .somebody-invites(v-if="invite")
    strong {{invite.userName}}
    br
    | invites you to join <strong>{{invite.teamName}}</strong>!
</template>


<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'InviteBlock',
    computed: {
      ...mapFields('invite', [
        'invite',
      ]),
    },
  };
</script>
