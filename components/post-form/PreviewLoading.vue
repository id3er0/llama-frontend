<template lang="pug">
  .post-image.busy(:style="{'background-image': `url(${preview})`}")
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'PostFormPreviewLoading',
    computed: {
      ...mapFields('post-form', [
        'preview',
      ]),
    },
  };
</script>
