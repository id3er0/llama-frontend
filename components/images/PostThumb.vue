<template lang="pug">
  ImagesAdd(
    v-if="item.isEmpty"
    isEmpty
  )
  .post-thumb(v-else)
    .post-thumb-remove(
      v-if="user.isCurrent && !(!showMore && index === showLimit && user.posts.length - 1 > showLimit)"
      @click="removePostModal(item.id)"
    )
      img(src="/images/x.svg")
    .post-thumb-image(
      :style="{'background-image': `url(${item.image.url})`}"
      @click="_showPost(item, index)"
    )
      .post-thumb-more-button(
        v-if="!showMore && index === showLimit && user.posts.length - 1 > showLimit"
      ) +{{user.posts.length - showLimit}}
      .post-thumb-description(
        v-else-if="item.text"
      )
        | {{item.text}}
</template>

<script>
  import ImagesAdd from '~/components/images/Add';
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    name: 'PostThumb',
    props: {
      user: Object,
      item: Object,
      index: Number,
      showLimit: Number,
      showMore: Boolean,
    },
    components: {
      ImagesAdd,
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
    },
    methods: {
      ...mapActions('posts', [
        'showPost',
        'removePostModal',
      ]),
      async _showPost(post, index) {
        if (!this.showMore && index === this.showLimit) {
          this.$emit('setShowMore', true);

          return false;
        }

        // Hack with copy of `post` object and force `isEditable` option to fix weird JS behavior.
        // await this.showPost(post);
        await this.showPost({...post, isEditable: true});
      },
    }
  };
</script>
