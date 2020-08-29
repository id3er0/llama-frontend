<template lang="pug">
  .alert
    .modal-title Rename
    input.input(
      type="text"
      v-model="displayName"
      style="width: 330px;"
    )
    .form-buttons.buttons
      .button-wrapper
        button.button.button-secondary(
          type="button"
          tabindex="-1"
          @click="show = null"
        ) Cancel
      .button-wrapper
        button.button.button-primary(
          type="button"
          :class="{busy: loading['update-profile']}"
          tabindex="-1"
          :disabled="!displayName || loading['update-profile']"
          @click="updateName"
        ) Save
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'UserNameUpdate',
    computed: {
      ...mapFields('loading', [
        'loading',
      ]),
      ...mapFields('user', [
        'user.displayName',
      ]),
      ...mapFields('modal', [
        'show',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'updateName',
      ]),
    },
  };
</script>
