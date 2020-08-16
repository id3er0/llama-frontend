<template lang="pug">
  div
    Modal
    Auth(v-if="!authorized")
    template(v-else)
      nuxt
</template>

<script>
  import { mapFields } from 'vuex-map-fields';
  import fixVH from '~/utils/fixVH';

  export default {
    components: {
      Login: () => import('~/components/auth/Login'),
      Modal: () => import('~/components/Modal'),
    },
    computed: {
      ...mapFields('auth', [
        'authorized',
      ]),
    },
    mounted() {
      fixVH();
    },
  };
</script>
