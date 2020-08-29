<template lang="pug">
  div
    Modal
    nuxt
</template>

<script>

  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Modal: () => import('~/components/Modal'),
    },
    created() {
      // Get invite id.
      const inviteId = this.$route.params.inviteId;
      if (inviteId) {
        this.inviteId = this.$route.params.inviteId;

        this.fetchInvite();
      }
    },
    computed: {
      ...mapFields('invite', [
        'inviteId',
      ]),
    },
    methods: {
      ...mapActions('invite', [
        'fetchInvite',
      ]),
    },
  };
</script>

<style lang="scss">
  @import '~/assets/styles/index';
</style>
