<template lang="pug">
  .alert
    .modal-title Invite
    input.input(
      :value="inviteLink"
      style="width: 330px;"
    )
    .form-buttons.buttons
      .button-wrapper
        button.button.button-primary(
          type="button"
          tabindex="-1"
          @click="show = false"
        ) Close
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';
  import objectValue from '~/utils/objectValue';

  export default {
    name: 'TeamInvite',
    computed: {
      ...mapFields('team', [
        'team',
      ]),
      ...mapFields('modal', [
        'show',
      ]),
      inviteLink() {
        return `${process.env.NUXT_ENV_HOST}/invite/${this.team.inviteId}`;
      },
    },
  };
</script>
