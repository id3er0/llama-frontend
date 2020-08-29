<template lang="pug">
  .alert
    .modal-title Remove
    div Are you sure you want to remove this post?
    .form-buttons.buttons
      .button-wrapper
        button.button.button-secondary(
          type="button"
          tabindex="-1"
          @click="closePostModal"
        ) Cancel
      .button-wrapper
        button.button.button-primary.danger(
          type="button"
          tabindex="-1"
          @click="removePost"
        ) Remove
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'PostRemove',
    computed: {
      ...mapFields('loading', [
        'loading',
      ]),
      ...mapFields('modal', [
        'show',
      ]),
      ...mapFields('posts', [
        'selectedIdToRemove',
      ]),
    },
    methods: {
      ...mapActions('posts', [
        'closePostModal',
        'removePost',
      ]),
    },
  };
</script>
