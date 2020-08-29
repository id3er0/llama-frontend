<template lang="pug">
  div
    div
      NavBar
      .directory
        Search
        UpdatesOnlyToggle
        div(
          v-if="Array.isArray(teamPostsGrouped) && teamPostsGrouped.length > 0"
          :key="date + updatesOnly"
        )
          PostsSection(
            v-for="(userPosts, index) in teamPostsGrouped"
            :key="`${index}_${userPosts.lastPostDate}`"
            :user="userPosts"
          )
        div(v-else)
          | Empty
    Footer
    Debug
</template>

<script>
  import NavBar from '~/components/NavBar';
  import Search from '~/components/Search';
  import UpdatesOnlyToggle from '~/components/UpdatesOnlyToggle';
  import PostsSection from '~/components/images/PostsSection';
  import Footer from '~/components/Footer';
  import Debug from '~/components/Debug';
  import {mapGetters} from 'vuex';
  import {mapFields} from 'vuex-map-fields';

  export default {
    name: 'Home',
    components: {
      NavBar,
      Search,
      UpdatesOnlyToggle,
      PostsSection,
      Footer,
      Debug,
    },
    computed: {
      ...mapGetters('team', [
        'teamPostsGrouped'
      ]),
      ...mapFields('team', [
        'updatesOnly',
      ]),
      ...mapFields('posts', [
        'date',
      ]),
    },
  };
</script>
