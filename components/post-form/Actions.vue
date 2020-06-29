<template lang="pug">
  .form-buttons.buttons
    button.button-wrapper(
      type="button"
      @click="close"
    )
      span.button.button-secondary(tabindex='-1') Cancel
    button.button-wrapper(
      type="button"
      @click="create"
      :disabled="!imageUrl"
    )
      span.button.button-primary.disabled(tabindex='-1') Submit
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
      ...mapFields('post-form', [
        'imageUrl',
      ]),
    },
    methods: {
      ...mapMutations('post-form', [
        'clean',
      ]),
      ...mapActions('post-form', [
        'create',
      ]),
      close() {
        this.show = null;
        this.clean();
      },
    },
  };
</script>
