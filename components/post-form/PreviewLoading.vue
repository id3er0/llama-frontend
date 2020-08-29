<template lang="pug">
  .post-image(
    :class="{busy: loading['post-image-upload']}"
    :style="{'background-image': `url(${preview})`}"
  )
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'PostFormPreviewLoading',
    computed: {
      ...mapFields('post-form', [
        'preview',
      ]),
      ...mapFields('loading', [
        'loading',
      ]),
    },
  };
</script>
