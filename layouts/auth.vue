<template lang="pug">
  div
    Modal
    nuxt
</template>

<script>

  export default {
    components: {
      Modal: () => import('~/components/Modal'),
    },
  };
</script>

<style lang="scss">
  @import '~/assets/styles/index';
</style>
