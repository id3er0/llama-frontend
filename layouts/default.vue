<template lang="pug">
  div(
    @dragover.prevent
    @drop.prevent
  )
    Modal
    Loading(v-if="firstRun")
    Login(v-else-if="!uid")
    template(v-else)
      nuxt
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';
  import fixVH from '~/utils/fixVH';

  export default {
    components: {
      Loading: () => import('~/components/Loading'),
      Login: () => import('~/components/auth/Login'),
      Modal: () => import('~/components/Modal'),
    },
    created() {
      // Init subscribes process.
      this.subscribeToUser();

      // Get invite id.
      const inviteId = this.$route.params.inviteId;
      if (inviteId) {
        this.inviteId = this.$route.params.inviteId;

        this.fetchInvite();
      }
    },
    mounted() {
      fixVH();
    },
    computed: {
      ...mapFields('loading', [
        'firstRun',
      ]),
      ...mapFields('user', [
        'user.uid',
      ]),
      ...mapFields('invite', [
        'inviteId',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'subscribeToUser',
      ]),
      ...mapActions('invite', [
        'fetchInvite',
      ]),
    },
  };
</script>

<style lang="scss">
  @import '~/assets/styles/index';
</style>
