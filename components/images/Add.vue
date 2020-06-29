<template lang="pug">
  .post-thumb
    button.post-thumb-add-button(
      type="button"
      @click="show = 'NewPost'"
    ) +
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'ImagesAdd',
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
  };
</script>
