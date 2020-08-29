<template lang="pug">
  .post-thumb(
    :class="{empty: isEmpty}"
    @click="show = 'PostEdit'"
  )
    .post-thumb-add-button(v-if="!isEmpty") +
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'ImagesAdd',
    props: {
      isEmpty: Boolean,
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
  };
</script>
