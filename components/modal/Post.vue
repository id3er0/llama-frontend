<template lang="pug">
  .post(v-if="selectedItem")
    .post-image(:style="{'background-image': `url(${selectedItem.imageUrl})`}")
    .post-description(
      v-if="selectedItem.text"
    )
      | {{selectedItem.text}}
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Post',
    computed: {
      ...mapGetters('posts', [
        'selectedItem',
      ]),
    },
  };
</script>
