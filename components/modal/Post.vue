<template lang="pug">
  .post(v-if="selectedItem && !selectedItem.isEditable")
    .post-image(
      :style="{'background-image': `url(${selectedItem.image.url})`}"
    )
    .post-description(
      v-if="selectedItem.text"
    )
      | {{selectedItem.text}}
  PostEdit(v-else-if="selectedItem")
</template>

<script>
  import { mapGetters } from 'vuex';
  import PostEdit from '~/components/modal/PostEdit';

  export default {
    name: 'Post',
    components: {PostEdit},
    computed: {
      ...mapGetters('posts', [
        'selectedItem',
      ]),
    },
  };
</script>
