<template lang="pug">
  div
    Modal
    Login(v-if="!uid")
    template(v-else)
      nuxt
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import { mapActions } from 'vuex';
  import fixVH from '~/utils/fixVH';

  export default {
    components: {
      Login: () => import('~/components/auth/Login'),
      Modal: () => import('~/components/Modal'),
    },
    created() {
      this.subscribeToUser();
    },
    mounted() {
      fixVH();
    },
    computed: {
      ...mapFields('user', [
        'user.uid',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'subscribeToUser'
      ]),
    },
  };
</script>

<style lang="scss">
  @import '~/assets/styles/index';
</style>
