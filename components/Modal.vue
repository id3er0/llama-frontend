<template lang="pug">
  .modal-overlay(v-if="show")
    .modal
      img.modal-x(
        src='/images/x.svg'
        @click="show = false"
      )
      component(
        :is="show"
      )
</template>

<script>
  import NewPost from '~/components/modal/NewPost';
  import Post from '~/components/modal/Post';
  import { mapFields } from 'vuex-map-fields';

  export default {
    components: {
      NewPost,
      Post,
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
  };
</script>
