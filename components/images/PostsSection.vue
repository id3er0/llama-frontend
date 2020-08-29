<template lang="pug">
  .human(v-if="user")
    .owner-name-wrapper(
      v-if="user.isCurrent"
      @click="show = 'UserNameUpdate'"
    )
      SectionUserName(:user="user")
      img(src="/images/edit.svg")
    .owner-name-wrapper(
      v-else
    )
      SectionUserName(:user="user")
    .posts-stream(
      v-if="Array.isArray(user.posts) && user.posts.length > 0"
    )
      ImagesAdd(
        v-if="user.isCurrent"
      )
      PostThumb(
        v-for="(item, index) in user.posts"
        v-if="showMore || index <= showLimit"
        :key="item.id"
        :user="user"
        :item="item"
        :index="index"
        :showLimit="showLimit"
        :showMore="showMore"
        @setShowMore="setShowMore"
      )
    div(v-else)
      | Empty
</template>

<script>
  import SectionUserName from '~/components/images/SectionUserName';
  import ImagesAdd from '~/components/images/Add';
  import PostThumb from '~/components/images/PostThumb';
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';
  import { showLimit } from '~/api/posts';

  export default {
    name: 'PostsSection',
    props: {
      user: Object,
    },
    data: () => ({
      showLimitBase: showLimit,
      showMore: false,
    }),
    components: {
      SectionUserName,
      ImagesAdd,
      PostThumb,
    },
    computed: {
      ...mapFields('modal', [
        'show',
      ]),
      showLimit() {
        return this.user.isCurrent
          ? this.showLimitBase
          : this.showLimitBase + 1;
      },
    },
    methods: {
      setShowMore(value) {
        this.showMore = value;
      },
    },
  };
</script>
