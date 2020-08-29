<template lang="pug">
  .form-buttons.buttons
    .button-wrapper
      button.button.button-secondary(
        type="button"
        tabindex="-1"
        @click="close"
      ) Cancel
    .button-wrapper
      button.button.button-primary(
        type="button"
        tabindex="-1"
        :class="{busy: busy}"
        :disabled="disabled"
        @click="submitPostForm"
      ) Submit
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapMutations, mapActions } from 'vuex';

  export default {
    name: 'PostFormActions',
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
      ...mapFields('loading', [
        'loading',
      ]),
      ...mapFields('post-form', [
        'image.url',
      ]),
      busy() {
        return this.loading['create-post']
          || this.loading['post-image-upload'];
      },
      disabled() {
        return !this.url
          || this.loading['create-post']
          || this.loading['post-image-upload'];
      },
    },
    methods: {
      ...mapMutations('post-form', [
        'clean',
      ]),
      ...mapActions('post-form', [
        'submitPostForm',
      ]),
      close() {
        this.show = null;
        this.clean();
      },
    },
  };
</script>
